<?php

declare(strict_types=1);

namespace App\Messenger\Handler\Loop;

use App\Entity\AbstractStep;
use App\Entity\Context;
use App\Entity\LoopStep;
use App\Entity\POPO\Condition;
use App\Entity\Traits\EntityManagerTrait;
use App\Entity\Traits\LoggerTrait;
use App\Messenger\Enum\Logs;
use App\Messenger\Handler\AbstractMessageHandler;
use App\Messenger\Traits\Handler\HandlerTrait;
use App\Messenger\Traits\Http\SendHttpRequestTrait;
use App\Messenger\Traits\Steps\GetNextStepTrait;
use App\Messenger\Traits\Variables\replaceDynamicVariablesTrait;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Component\Uid\Uuid;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[AsMessageHandler]
final class LoopMessageHandler extends AbstractMessageHandler
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
        $this->setHandlerName(LoopLogs::HANDLER_NAME->value);
    }

    public function __invoke(LoopMessage $message): void
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
            if (null === $step || !($step instanceof LoopStep)) {
                throw new \Exception(Logs::STEP_NOT_FOUND->getLog());
            }
            $this->setStepName($step->getName());
            $this->logBeginStep($idScenario, $idExecution, $step);
            $conditions = $step->getConditions();
            if (null === $conditions) {
                throw new \Exception(Logs::ERROR_STEP->getLog(['name' => $step->getName(), 'handler' => $this->handlerName, 'message' => LoopLogs::MISSING_PARAMETERS->value]));
            }

            $contextCurrentStep = $this->getCurrentStepInContext($context, $step);
            $stepNumberNextStep = $this->verifyConditions($context, $contextCurrentStep, $conditions);

            $nextStepMessage = $this->getNextStep($context, (int) $stepNumberNextStep);

            $this->handleMessage($context, $nextStepMessage);
        } catch (\Exception $e) {
            $this->handleFailure($context, $step, $e->getMessage(), $this->handlerName);
        } finally {
            $this->logEndStep($idScenario, $idExecution, $step ?? null, null, $this->getError());
        }
    }

    private function logEndStep(Uuid $idScenario, Uuid $idExecution, ?AbstractStep $step, ?LoopStep $stepInContext, ?string $error): void
    {
        $this->log(
            $idScenario,
            $idExecution,
            Logs::END_STEP->getLog(['name' => $this->getStepName(), 'handler' => $this->handlerName]),
            isset($step) ? $step->getId() : Uuid::v6(),
            $stepInContext ?? ($step ?? null),
            $error
        );
    }

    private function getCurrentStepInContext(Context $context, AbstractStep $step): LoopStep
    {
        $contextCurrentStep = $context->getSteps()[$step->getStepNumber() - 1];
        if (null === $contextCurrentStep || !($contextCurrentStep instanceof LoopStep)) {
            throw new \Exception(Logs::NO_STEP_IN_CONTEXT->getLog());
        }

        return $contextCurrentStep;
    }

    /**
     * @param array<Condition> $conditions
     */
    private function verifyConditions(Context $context, LoopStep $contextCurrentStep, array $conditions): int
    {
        $stopLoop = true;

        foreach ($conditions as $condition) {
            $conditionDynamicValue = $condition->getDynamicValue() ?? '';
            $conditionValue = $condition->getValue() ?? '';
            $conditionDefaultValue = $condition->getDefaultValue() ?? '';

            $conditionDynamicValueVariable = $this->replaceVariablesInString($context, $conditionDynamicValue);

            preg_match_all('/<<(v|r):(steps\[(\d+)\]|scenario):([^\s>]+)>>/', $conditionDynamicValue, $matches, \PREG_SET_ORDER);
            $type = $matches[0][1];
            $stepPart = $matches[0][2];
            $stepNumber = (int) $matches[0][3];
            $variablePath = $matches[0][4];

            if (empty($conditionDynamicValueVariable)) {
                $stepBasedOnStepNumber = $this->getStepBasedOnStepNumber($stepNumber, $context->getSteps());
                if (null !== $stepBasedOnStepNumber) {
                    $conditionDynamicValueVariable = $this->createDynamicVariable($stepBasedOnStepNumber, $conditionDefaultValue, $variablePath);
                }
            }

            $output = '';
            switch ($type) {
                case 'v':
                    if (preg_match('/steps\[(\d+)\]/', $stepPart, $stepMatch)) {
                        $output = 'steps['.($stepNumber - 1)."].variables[$variablePath]";
                    } else {
                        $output = "scenario.variables[$variablePath]";
                    }
                    break;
                case 'r':
                    if (preg_match('/steps\[(\d+)\]/', $stepPart, $stepMatch)) {
                        $output = 'steps['.($stepNumber - 1)."].response.$variablePath";
                    }
                    break;
            }

            $stopLoop = $stopLoop && $this->verifyCondition($context, $conditionValue, $conditionDynamicValueVariable, $output);
        }

        return $stopLoop ? ($contextCurrentStep->getStepNumber() + 1) : $contextCurrentStep->getStepToReturn();
    }

    private function createDynamicVariable(AbstractStep $stepBasedOnStepNumber, mixed $conditionDefaultValue, string $conditionDynamicValueVariablePath): mixed
    {
        $stepBasedOnStepNumber->addVariable((string) $conditionDynamicValueVariablePath, $this->castToString($conditionDefaultValue));

        return $conditionDefaultValue;
    }

    private function verifyCondition(Context $context, mixed $conditionValue, mixed $conditionDynamicValueVariable, string $conditionDynamicValueVariablePath): bool
    {
        $conditionValueType = \gettype($this->autoCast($conditionValue));

        switch ($conditionValueType) {
            case 'NULL':
                return $conditionValueType === \gettype($conditionDynamicValueVariable);
            case 'integer':
                $this->setProperty($context, $conditionDynamicValueVariablePath, $conditionDynamicValueVariable + 1);

                return $conditionDynamicValueVariable >= $conditionValue;
            case 'string':
                return $conditionDynamicValueVariable === $conditionValue;
            default:
                return true;
        }
    }
}
