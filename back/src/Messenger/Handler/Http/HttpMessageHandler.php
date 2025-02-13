<?php

declare(strict_types=1);

namespace App\Messenger\Handler\Http;

use App\Entity\AbstractStep;
use App\Entity\Context;
use App\Entity\ContextHttpStep;
use App\Entity\HttpStep;
use App\Entity\POPO\HttpResponse;
use App\Entity\POPO\Treatment;
use App\Entity\Traits\EntityManagerTrait;
use App\Entity\Traits\LoggerTrait;
use App\Messenger\Enum\Logs;
use App\Messenger\Handler\AbstractMessageHandler;
use App\Messenger\Traits\Handler\HandlerTrait;
use App\Messenger\Traits\Http\SendHttpRequestTrait;
use App\Messenger\Traits\Steps\GetNextStepTrait;
use App\Messenger\Traits\Variables\replaceDynamicVariablesTrait;
use Doctrine\ORM\EntityManagerInterface;
use Faker\Factory;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[AsMessageHandler]
final class HttpMessageHandler extends AbstractMessageHandler
{
    use EntityManagerTrait;
    use GetNextStepTrait;
    use HandlerTrait;
    use LoggerTrait;
    use replaceDynamicVariablesTrait;
    use SendHttpRequestTrait;

    public function __construct(MessageBusInterface $bus, HttpClientInterface $client, EntityManagerInterface $entityManager)
    {
        parent::__construct($bus);
        $this->setClient($client);
        $this->setPropertyAccess(PropertyAccess::createPropertyAccessor());
        $this->setEntityManager($entityManager);
        $this->setHandlerName(HttpLogs::HANDLER_NAME->value);
        $this->setFaker(Factory::create());
    }

    /** @throws \Exception */
    public function __invoke(HttpMessage $message): void
    {
        $context = $message->getContext();
        if (null === $context) {
            throw new \Exception(Logs::CONTEXT_NOT_FOUND->getLog());
        }

        $idScenario = $context->getScenario()->getId();
        $idExecution = $context->getIdExecution();
        $this->setIdExecution($idExecution);

        try {
            $step = $message->getStep();
            if (null === $step || !($step instanceof HttpStep)) {
                throw new \Exception(Logs::STEP_NOT_FOUND->getLog());
            }

            $this->setStepName($step->getName());
            $this->beginStep($idScenario, $idExecution, $step);

            $response = $this->handleRequest($step, $context);
            $stepInContext = $this->updateContext($context, $step, $response);

            $nextStepMessage = $this->getNextStep($context, $step->getStepNumber() + 1);
            $this->handleMessage($context, $nextStepMessage);
        } catch (\Exception $e) {
            $this->handleError($context, $step ?? null, $e);
        } finally {
            $stepInContext ??= null;
            $step ??= null;

            if (null !== $stepInContext) {
                $stepInContext = $this->replaceDynamicVariablesInStep($context, $stepInContext);
            } elseif (null !== $step) {
                $step = $this->replaceDynamicVariablesInStep($context, $step);
            }

            $this->endStep($context, $idScenario, $idExecution, $step, $stepInContext, $this->getError() ?? null);
        }
    }

    private function replaceDynamicVariablesInStep(Context $context, AbstractStep $step): AbstractStep
    {
        if ($step instanceof HttpStep) {
            $variables = $step->getVariables();
            $url = $step->getUrl();
            $content = $step->getContent();
            $headers = $step->getHeaders();

            [$variables, $url, $content, $headers] = $this->replaceDynamicVariables($context, $step, $variables, $url, $content, $headers);

            if (null !== $variables && \is_array($variables)) {
                $step->setVariables(array_filter($variables, 'is_string', \ARRAY_FILTER_USE_KEY));
            }
            if (null !== $content && \is_array($content)) {
                $step->setContent($content);
            }
            if (null !== $headers && \is_array($headers)) {
                $step->setHeaders(array_filter($headers, 'is_string', \ARRAY_FILTER_USE_KEY));
            }
            $step->setUrl($url);
        }

        return $step;
    }

    private function handleRequest(HttpStep $step, Context $context): HttpResponse
    {
        $content = $step->getContent();
        $headers = $step->getHeaders();
        $method = $step->getMethod()->value;
        $url = $step->getUrl();
        $variables = $step->getVariables();
        [$variables, $url, $content, $headers] = $this->replaceDynamicVariables($context, $step, $variables, $url, $content, $headers);

        $treatment = $step->getTreatment();
        $check = $step->getCheckConditions();

        return $this->handleHttpRequest($method, $url, $content, $headers, $check, $treatment);
    }

    private function updateContext(Context $context, AbstractStep $step, HttpResponse $response): ContextHttpStep
    {
        $stepNumber = $step->getStepNumber();
        $currentStepInContext = $this->getStepBasedOnStepNumber($stepNumber, $context->getSteps());
        if (null === $currentStepInContext || !($currentStepInContext instanceof ContextHttpStep)) {
            throw new \Exception(Logs::NO_STEP_IN_CONTEXT->getLog());
        }
        $currentStepInContext->setResponse($response);

        return $currentStepInContext;
    }

    /**
     * @param array<mixed>     $content
     * @param array<mixed>     $headers
     * @param array<mixed>     $checkConditions
     * @param array<Treatment> $treatment
     */
    private function handleHttpRequest(string $method, string $url, ?array $content, ?array $headers, ?array $checkConditions, ?array $treatment): HttpResponse
    {
        $options = $this->createOptions($headers, $content);

        $response = $this->sendHttpRequest($method, $url, $options);
        if (null === $response) {
            throw new \Exception(HttpLogs::ERROR_SENDING_HTTP_REQUEST->value);
        }

        if (null !== $treatment && \count($treatment) > 0 && null !== $content) {
            $response = $this->treatment($response, $content, $treatment);
        }

        if (null !== $checkConditions && \is_array($checkConditions) && \count($checkConditions) > 0) {
            $isChecked = $this->check($response, $checkConditions);
            if (!$isChecked) {
                throw new \Exception(HttpLogs::CHECK_FAILED->value);
            }
        }

        return $response;
    }

    /**
     * @param array<string, string> $variables
     * @param array<mixed>          $content
     * @param array<string, string> $headers
     *
     * @return array{0: array<mixed>|null, 1: string, 2: array<mixed>|null, 3: array<mixed>|null} the modified URL, content and headers
     */
    private function replaceDynamicVariables(Context $context, HttpStep $step, ?array $variables, string $url, ?array $content, ?array $headers): array
    {
        if (null !== $variables) {
            array_walk_recursive($variables, fn (&$value) => $value = \is_string($value) ? $this->replaceVariablesInString($context, $value) : $value);
        }

        $url = $this->replaceVariablesInString($context, $url);

        return [
            $variables,
            \is_string($url) ? $url : '',
            (null !== $content) ? $this->replaceVariablesInArray($context, $content) : null,
            (null !== $headers) ? $this->replaceVariablesInArray($context, $headers) : null,
        ];
    }
}
