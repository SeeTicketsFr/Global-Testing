<?php

declare(strict_types=1);

namespace App\Messenger\Handler\Sqs;

use App\Entity\Context;
use App\Entity\ContextSqsStep;
use App\Entity\POPO\SqsResponse;
use App\Entity\SqsStep;
use App\Entity\Traits\EntityManagerTrait;
use App\Entity\Traits\LoggerTrait;
use App\Messenger\Enum\Logs;
use App\Messenger\Handler\AbstractMessageHandler;
use App\Messenger\Traits\Handler\HandlerTrait;
use App\Messenger\Traits\Steps\GetNextStepTrait;
use App\Messenger\Traits\Variables\replaceDynamicVariablesTrait;
use Aws\Result;
use Aws\Sqs\SqsClient;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[AsMessageHandler]
final class SqsMessageHandler extends AbstractMessageHandler
{
    use EntityManagerTrait;
    use GetNextStepTrait;
    use HandlerTrait;
    use LoggerTrait;
    use replaceDynamicVariablesTrait;

    private ?SqsClient $sqsClient;

    public function __construct(MessageBusInterface $bus, EntityManagerInterface $entityManager, ?SqsClient $sqsClient, HttpClientInterface $client)
    {
        parent::__construct($bus);
        $this->setPropertyAccess(PropertyAccess::createPropertyAccessor());
        $this->setEntityManager($entityManager);
        $this->setHandlerName(SqsLogs::HANDLER_NAME->value);
        $this->sqsClient = $sqsClient;
        $this->setClient($client);
    }

    public function __invoke(SqsMessage $message): void
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
            if (null === $step || !($step instanceof SqsStep)) {
                throw new \Exception(Logs::STEP_NOT_FOUND->getLog());
            }

            $this->setStepName($step->getName());
            $this->beginStep($idScenario, $idExecution, $step);

            [$url, $region, $accessKey, $secretKey, $messageGroupId, $content] = $this->replaceDynamicVariables($context, $step, $step->getUrl(), $step->getRegion(), $step->getAccessKey(), $step->getSecretKey(), $step->getMessageGroupId(), $step->getContent(), $step->getVariables());

            if (null === $this->sqsClient) {
                $this->sqsClient = $this->createClient('latest', $region, $accessKey, $secretKey);
            }
            $content = json_encode($content);
            $params = $this->createParams($url, $content ?: '', $messageGroupId, (string) rand());

            $result = $this->sqsClient->sendMessage($params);
            $stepInContext = $this->updateContext($context, $step, $result);

            $nextStepMessage = $this->getNextStep($context, $step->getStepNumber() + 1);
            $this->handleMessage($context, $nextStepMessage);
        } catch (\Exception $e) {
            $this->handleError($context, $step ?? null, $e);
        } finally {
            $this->endStep($context, $idScenario, $idExecution, $step ?? null, $stepInContext ?? null, $this->getError() ?? null);
        }
    }

    private function createClient(string $version, string $region, string $accessKey, string $secretKey): SqsClient
    {
        return new SqsClient([
            'version' => $version,
            'region' => $region,
            'credentials' => [
                'key' => $accessKey,
                'secret' => $secretKey,
            ],
        ]);
    }

    /**
     * @return array<string, string>
     */
    private function createParams(string $url, string $content, string $messageGroupId, string $messageDeduplicationId): array
    {
        return [
            'QueueUrl' => $url,
            'MessageBody' => $content,
            'MessageGroupId' => $messageGroupId,
            'MessageDeduplicationId' => $messageDeduplicationId,
        ];
    }

    /**
     * @param array<mixed>|null          $content
     * @param array<string, string>|null $variables
     *
     * @return array{0: string, 1: string, 2: string, 3: string, 4: string, 5: array<mixed>|null}
     */
    private function replaceDynamicVariables(Context $context, SqsStep $step, string $url, string $region, string $accessKey, string $secretKey, string $messageGroupId, ?array $content, ?array $variables): array
    {
        if (null !== $variables) {
            array_walk_recursive($variables, fn (&$value) => $value = \is_string($value) ? $this->replaceVariablesInString($context, $value) : $value);
            $step->setVariables($variables);
        }
        $url = $this->replaceVariablesInString($context, $url);
        $region = $this->replaceVariablesInString($context, $region);
        $accessKey = $this->replaceVariablesInString($context, $accessKey);
        $secretKey = $this->replaceVariablesInString($context, $secretKey);
        $messageGroupId = $this->replaceVariablesInString($context, $messageGroupId);

        return [
            \is_string($url) ? $url : '',
            \is_string($region) ? $region : '',
            \is_string($accessKey) ? $accessKey : '',
            \is_string($secretKey) ? $secretKey : '',
            \is_string($messageGroupId) ? $messageGroupId : '',
            (null !== $content) ? $this->replaceVariablesInArray($context, $content) : null,
        ];
    }

    /**
     * @param Result<mixed> $result
     */
    private function updateContext(Context $context, SqsStep $step, Result $result): ContextSqsStep
    {
        $stepNumber = $step->getStepNumber();
        $currentStepInContext = $this->getStepBasedOnStepNumber($stepNumber, $context->getSteps());
        if (null === $currentStepInContext || !($currentStepInContext instanceof ContextSqsStep)) {
            throw new \Exception(Logs::NO_STEP_IN_CONTEXT->getLog());
        }
        $currentStepInContext->setResponse($this->convertResult($result));

        return $currentStepInContext;
    }

    /**
     * @param Result<mixed>|null $result
     */
    private function convertResult(?Result $result): ?SqsResponse
    {
        if (null === $result) {
            return null;
        }

        $metadata = $result->get('@metadata');
        $statusCode = \is_array($metadata) ? $metadata['statusCode'] : null;

        return new SqsResponse(
            \is_int($statusCode) ? $statusCode : null,
            $result->toArray(),
            \is_array($metadata) ? $metadata : null
        );
    }
}
