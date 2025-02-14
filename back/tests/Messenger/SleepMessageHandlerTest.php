<?php

namespace App\Tests\Messenger;

use App\Entity\Context;
use App\Entity\Log;
use App\Entity\Scenario;
use App\Entity\SleepStep;
use App\Messenger\Enum\Logs;
use App\Messenger\Handler\Sleep\SleepLogs;
use App\Messenger\Handler\Sleep\SleepMessage;
use App\Messenger\Handler\Sleep\SleepMessageHandler;
use App\Tests\Functional\AbstractApiTestCase;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Messenger\Stamp\TransportNamesStamp;
use Symfony\Component\Messenger\Transport\InMemory\InMemoryTransport;
use Symfony\Component\Uid\Uuid;

class SleepMessageHandlerTest extends AbstractApiTestCase
{
    /**
     * @param array<array<string, mixed>> $stepsData
     */
    private function createSleepTestSetup(array $stepsData): SleepMessage
    {
        $idExecution = Uuid::v6();
        $scenario = new Scenario();
        $context = new Context($scenario, $idExecution);

        $steps = [];
        foreach ($stepsData as $stepData) {
            $step = new SleepStep();
            $step->setDuration(is_numeric($stepData['duration']) ? (int) $stepData['duration'] : 0);
            $step->setId(\is_string($stepData['id']) ? Uuid::fromString((string) $stepData['id']) : throw new \InvalidArgumentException('ID must be a string'));
            $step->setName(\is_string($stepData['name']) ? (string) $stepData['name'] : throw new \InvalidArgumentException('Name must be a string'));
            $step->setStepNumber(is_numeric($stepData['stepNumber']) ? (int) $stepData['stepNumber'] : 0);
            $step->setRunAfterFailure((bool) $stepData['runAfterFailure']);
            $step->setVariables(\is_array($stepData['variables']) ? $stepData['variables'] : []);

            $scenario->addStep($step);
            $context->addStep($step);
            $steps[] = $step;
        }

        return new SleepMessage($steps[0], $context);
    }

    /**
     * Used by testSleepMessageHandlerOk.
     *
     * @return \Generator<string, array<mixed>>
     */
    public function valuesProviderSleepMessageHandlerOk(): \Generator
    {
        yield 'SleepStep with no next step' => [
            'sleepMessage' => $this->createSleepTestSetup([
                [
                    'duration' => 1,
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e04',
                    'name' => 'Sleep step_1',
                    'stepNumber' => 1,
                    'runAfterFailure' => false,
                    'variables' => ['variable1' => 'value1'],
                ],
            ]),
            'expectedLogs' => [
                Logs::BEGIN_STEP->getLog(['name' => 'Sleep step_1', 'handler' => SleepLogs::HANDLER_NAME->value]),
                Logs::END_STEP->getLog(['name' => 'Sleep step_1', 'handler' => SleepLogs::HANDLER_NAME->value]),
            ],
            'hasNextStep' => false,
            'dbQueryCount' => 8,
        ];

        yield 'SleepStep with next step' => [
            'sleepMessage' => $this->createSleepTestSetup([
                [
                    'duration' => 1,
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e04',
                    'name' => 'Sleep step_1',
                    'stepNumber' => 1,
                    'runAfterFailure' => false,
                    'variables' => ['variable1' => 'value1'],
                ],
                [
                    'duration' => 1,
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e05',
                    'name' => 'Sleep step_2',
                    'stepNumber' => 2,
                    'runAfterFailure' => false,
                    'variables' => ['variable2' => 'value2'],
                ],
            ]),
            'expectedLogs' => [
                Logs::BEGIN_STEP->getLog(['name' => 'Sleep step_1', 'handler' => SleepLogs::HANDLER_NAME->value]),
                Logs::END_STEP->getLog(['name' => 'Sleep step_1', 'handler' => SleepLogs::HANDLER_NAME->value]),
            ],
            'hasNextStep' => true,
            'dbQueryCount' => 7,
        ];
    }

    /**
     * @dataProvider valuesProviderSleepMessageHandlerOk
     *
     * @param array<string> $expectedLogs
     */
    public function testSleepMessageHandlerOk(SleepMessage $sleepMessage, array $expectedLogs, bool $hasNextStep, int $dbQueryCount): void
    {
        $client = self::createPublicClient(withProfiler: true);
        $clientContainer = $client->getContainer();
        if (!($clientContainer instanceof ContainerInterface)) {
            return;
        }

        /** @var MessageBusInterface $bus */
        $bus = $clientContainer->get('messenger.default_bus');

        /** @var InMemoryTransport $transport */
        $transport = $clientContainer->get('messenger.transport.async');

        // Empty queue
        self::assertCount(0, $envelopes = $transport->getSent());

        // Send one SleepMessage
        $bus->dispatch($sleepMessage, [new TransportNamesStamp('messenger.transport.async')]);
        self::assertCount(1, $envelopes = $transport->getSent());

        // Rest the queue to delete this message
        $transport->reset();

        // Handle the message
        /** @var SleepMessageHandler $handler */
        $handler = $clientContainer->get(SleepMessageHandler::class);
        /** @var SleepMessage $message */
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

        $context = $sleepMessage->getContext();
        if (null === $context) {
            self::fail('The context is null, cannot retrieve idExecution.');
        }
        $idExecution = $context->getIdExecution()->toString();
        /**
         * @var Log[] $logs
         */
        $logs = $entityRepository->findBy(['idExecution' => $idExecution]);
        $this->assertEquals(\count($expectedLogs), \count($logs));

        $humanDescriptions = array_map(
            static fn (Log $log) => $log->getHumanDescription(),
            $logs
        );
        self::assertEquals($expectedLogs, $humanDescriptions);
    }
}
