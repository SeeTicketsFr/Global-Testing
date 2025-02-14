<?php

namespace App\Tests\Messenger;

use App\Entity\Log;
use App\Messenger\Enum\Logs;
use App\Messenger\Handler\Scenario\ScenarioLogs;
use App\Messenger\Handler\Scenario\ScenarioMessage;
use App\Messenger\Handler\Scenario\ScenarioMessageHandler;
use App\Tests\Functional\AbstractApiTestCase;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Messenger\Stamp\TransportNamesStamp;
use Symfony\Component\Messenger\Transport\InMemory\InMemoryTransport;
use Symfony\Component\Uid\Uuid;

class ScenarioMessageHandlerTest extends AbstractApiTestCase
{
    /**
     * Used by testScenarioMessageHandlerOk.
     *
     * @return \Generator<string, array<mixed>>
     */
    public function valuesProviderScenarioMessageHandlerOk(): \Generator
    {
        yield 'Scenario with a minimum of one step' => [
            'idScenario' => Uuid::fromString('016b1d91-a8df-6a09-90c2-56d8e6ef1fb6'),
            'expectedLog' => Logs::BEGIN_SCENARIO->getLog(['name' => 'Scenario 1', 'handler' => ScenarioLogs::HANDLER_NAME->value]),
            'hasNextStep' => true,
            'dbQueryCount' => 7,
        ];

        yield 'Scenario with no step' => [
            'idScenario' => Uuid::fromString('016b1d91-a8df-6a09-90c2-56d8e6ef1fc7'),
            'expectedLog' => Logs::ERROR_SCENARIO->getLog([
                'name' => 'Scenario 2',
                'handler' => ScenarioLogs::HANDLER_NAME->value,
                'message' => ScenarioLogs::SCENARIO_HAS_NO_STEP->value,
            ]),
            'hasNextStep' => false,
            'dbQueryCount' => 7,
        ];

        yield 'Not existing scenario' => [
            'idScenario' => Uuid::fromString('016b1d91-a8df-6a09-90c2-56d8e6ef1fc0'),
            'expectedLog' => Logs::ERROR_SCENARIO->getLog([
                'name' => 'Unknown Scenario',
                'handler' => ScenarioLogs::HANDLER_NAME->value,
                'message' => ScenarioLogs::SCENARIO_NOT_FOUND->value,
            ]),
            'hasNextStep' => false,
            'dbQueryCount' => 5,
        ];
    }

    /**
     * @dataProvider valuesProviderScenarioMessageHandlerOk
     */
    public function testScenarioMessageHandlerOk(Uuid $idScenario, string $expectedLog, bool $hasNextStep, int $dbQueryCount): void
    {
        $client = self::createPublicClient(withProfiler: true);
        $clientContainer = $client->getContainer();
        if (!($clientContainer instanceof ContainerInterface)) {
            return;
        }

        $idExecution = Uuid::v6();
        $scenarioMessage = new ScenarioMessage(idScenario: $idScenario, idExecution: $idExecution);

        /** @var MessageBusInterface $bus */
        $bus = $clientContainer->get('messenger.default_bus');

        /** @var InMemoryTransport $transport */
        $transport = $clientContainer->get('messenger.transport.async');

        // Empty queue
        self::assertCount(0, $envelopes = $transport->getSent());

        // Send one ScenarioMessage
        $bus->dispatch($scenarioMessage, [new TransportNamesStamp('messenger.transport.async')]);
        self::assertCount(1, $envelopes = $transport->getSent());

        // Rest the queue to delete this message
        $transport->reset();

        // Handle the message
        /** @var ScenarioMessageHandler $handler */
        $handler = $clientContainer->get(ScenarioMessageHandler::class);
        /** @var ScenarioMessage $message */
        $message = $envelopes[0]->getMessage();
        $handler($message);

        // Handler sent the next step message
        self::assertCount($hasNextStep ? 1 : 0, $envelopes = $transport->getSent());

        self::assertCountDbQueryCountWithoutClient($dbQueryCount);

        // Verify logs
        /** @var EntityManagerInterface $entityManager */
        $entityManager = $clientContainer->get(EntityManagerInterface::class);
        /** @var EntityRepository<Log> $entityRepository */
        $entityRepository = $entityManager->getRepository(Log::class);

        /**
         * @var Log[] $logs
         */
        $logs = $entityRepository->findBy(['idExecution' => $idExecution->toString()]);
        $this->assertEquals(1, \count($logs));

        $firstLog = $logs[0];
        self::assertEquals(
            $expectedLog,
            $firstLog->getHumanDescription()
        );
    }
}
