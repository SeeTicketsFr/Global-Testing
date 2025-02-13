<?php

declare(strict_types=1);

namespace App\Messenger\Handler\Scenario;

use App\Entity\Context;
use App\Entity\Scenario;
use App\Entity\Traits\EntityManagerTrait;
use App\Entity\Traits\LoggerTrait;
use App\Messenger\Enum\Logs;
use App\Messenger\Handler\AbstractMessageHandler;
use App\Messenger\Traits\Handler\HandlerTrait;
use App\Messenger\Traits\Steps\GetNextStepTrait;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Uid\Uuid;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[AsMessageHandler]
final class ScenarioMessageHandler extends AbstractMessageHandler
{
    use EntityManagerTrait;
    use GetNextStepTrait;
    use HandlerTrait;
    use LoggerTrait;

    public function __construct(MessageBusInterface $bus, EntityManagerInterface $entityManager, HttpClientInterface $client)
    {
        parent::__construct($bus);
        $this->setEntityManager($entityManager);
        $this->setHandlerName(ScenarioLogs::HANDLER_NAME->value);
        $this->setClient($client);
    }

    public function __invoke(ScenarioMessage $message): void
    {
        $idScenario = $message->getIdScenario();
        $this->setIdExecution($message->getIdExecution() ?? Uuid::v6());

        try {
            $scenario = $this->fetchScenario($idScenario);
            if (null === $scenario) {
                throw new \Exception(ScenarioLogs::SCENARIO_NOT_FOUND->value);
            }

            if (!$scenario->hasSteps()) {
                throw new \Exception(ScenarioLogs::SCENARIO_HAS_NO_STEP->value);
            }

            $this->logBeginScenario($idScenario, $scenario);

            $this->sendFirstStepMessage($message->createContext($this->idExecution, $scenario), 1);
        } catch (\Exception $e) {
            $this->logError($e->getMessage(), $scenario);
        }
    }

    private function fetchScenario(Uuid $idScenario): ?Scenario
    {
        return $this->getEntityManager()->getRepository(Scenario::class)->find($idScenario);
    }

    private function sendFirstStepMessage(Context $context, int $stepNumber = 1): void
    {
        $nextStepMessage = $this->getNextStep($context, $stepNumber);
        $this->handleMessage($context, $nextStepMessage);
    }

    private function logBeginScenario(Uuid $idScenario, Scenario $scenario): void
    {
        $this->log(
            $idScenario,
            $this->idExecution,
            Logs::BEGIN_SCENARIO->getLog(['name' => $scenario->getName(), 'handler' => $this->handlerName]),
            null,
            null,
            null
        );
    }

    private function logError(string $errorMessage, ?Scenario $scenario = null): void
    {
        $scenarioId = $scenario ? $scenario->getId() : Uuid::v6();
        $scenarioName = $scenario ? $scenario->getName() : 'Unknown Scenario';

        $this->log(
            $scenarioId,
            $this->idExecution,
            Logs::ERROR_SCENARIO->getLog([
                'name' => $scenarioName,
                'handler' => $this->handlerName,
                'message' => $errorMessage,
            ]),
            null,
            null,
            $errorMessage
        );
    }
}
