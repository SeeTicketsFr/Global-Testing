<?php

namespace App\Tests\Messenger;

use App\Entity\Context;
use App\Entity\Log;
use App\Entity\LoopStep;
use App\Entity\POPO\Condition;
use App\Entity\Scenario;
use App\Messenger\Enum\Logs;
use App\Messenger\Handler\Loop\LoopLogs;
use App\Messenger\Handler\Loop\LoopMessage;
use App\Messenger\Handler\Loop\LoopMessageHandler;
use App\Tests\Functional\AbstractApiTestCase;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Messenger\Stamp\TransportNamesStamp;
use Symfony\Component\Messenger\Transport\InMemory\InMemoryTransport;
use Symfony\Component\Uid\Uuid;

class LoopMessageHandlerTest extends AbstractApiTestCase
{
    /**
     * @param array<array<string, mixed>> $stepsData
     */
    private function createLoopTestSetup(array $stepsData): LoopMessage
    {
        $idExecution = Uuid::v6();
        $scenario = new Scenario();
        $context = new Context($scenario, $idExecution);

        $steps = [];
        foreach ($stepsData as $stepData) {
            $step = new LoopStep();
            $step->setStepToReturn(is_numeric($stepData['stepToReturn']) ? (int) $stepData['stepToReturn'] : 0);
            $step->setConditions(\is_array($stepData['conditions']) ? $stepData['conditions'] : []);
            $step->setId(\is_string($stepData['id']) ? Uuid::fromString((string) $stepData['id']) : throw new \InvalidArgumentException('ID must be a string'));
            $step->setName(\is_string($stepData['name']) ? (string) $stepData['name'] : throw new \InvalidArgumentException('Name must be a string'));
            $step->setStepNumber(is_numeric($stepData['stepNumber']) ? (int) $stepData['stepNumber'] : 0);
            $step->setRunAfterFailure((bool) $stepData['runAfterFailure']);
            $step->setVariables(\is_array($stepData['variables']) ? $stepData['variables'] : []);

            $scenario->addStep($step);
            $context->addStep($step);
            $steps[] = $step;
        }

        return new LoopMessage($steps[0], $context);
    }

    /**
     * Used by testLoopMessageHandlerOk.
     *
     * @return \Generator<string, array<mixed>>
     */
    public function valuesProviderLoopMessageHandlerOk(): \Generator
    {
        $condition1 = (new Condition())->setDynamicValue('<<v:scenario:notexist>>')
                                       ->setDefaultValue('')
                                       ->setValue('NotTheSameValue');

        yield 'LoopStep with no next step' => [
            'loopMessage' => $this->createLoopTestSetup([
                [
                    'stepToReturn' => 0,
                    'conditions' => [
                        $condition1,
                    ],
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e04',
                    'name' => 'Loop step_1',
                    'stepNumber' => 1,
                    'runAfterFailure' => false,
                    'variables' => ['variable1' => 'value1'],
                ],
            ]),
            'expectedLogs' => [
                Logs::BEGIN_STEP->getLog(['name' => 'Loop step_1', 'handler' => LoopLogs::HANDLER_NAME->value]),
                Logs::END_STEP->getLog(['name' => 'Loop step_1', 'handler' => LoopLogs::HANDLER_NAME->value]),
            ],
            'hasNextStep' => false,
            'dbQueryCount' => 9,
        ];

        yield 'LoopStep with next step' => [
            'loopMessage' => $this->createLoopTestSetup([
                [
                    'stepToReturn' => 0,
                    'conditions' => [],
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e04',
                    'name' => 'Loop step_1',
                    'stepNumber' => 1,
                    'runAfterFailure' => false,
                    'variables' => ['variable1' => 'value1'],
                ],
                [
                    'stepToReturn' => 0,
                    'conditions' => [],
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e05',
                    'name' => 'Loop step_2',
                    'stepNumber' => 2,
                    'runAfterFailure' => false,
                    'variables' => ['variable2' => 'value2'],
                ],
            ]),
            'expectedLogs' => [
                Logs::BEGIN_STEP->getLog(['name' => 'Loop step_1', 'handler' => LoopLogs::HANDLER_NAME->value]),
                Logs::END_STEP->getLog(['name' => 'Loop step_1', 'handler' => LoopLogs::HANDLER_NAME->value]),
            ],
            'hasNextStep' => true,
            'dbQueryCount' => 8,
        ];
    }

    /**
     * @dataProvider valuesProviderLoopMessageHandlerOk
     *
     * @param array<string> $expectedLogs
     */
    public function testLoopMessageHandlerOk(LoopMessage $loopMessage, array $expectedLogs, bool $hasNextStep, int $dbQueryCount): void
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

        // Send one LoopMessage
        $bus->dispatch($loopMessage, [new TransportNamesStamp('messenger.transport.async')]);
        self::assertCount(1, $envelopes = $transport->getSent());

        // Rest the queue to delete this message
        $transport->reset();

        // Handle the message
        /** @var LoopMessageHandler $handler */
        $handler = $clientContainer->get(LoopMessageHandler::class);
        /** @var LoopMessage $message */
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

        $context = $loopMessage->getContext();
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
