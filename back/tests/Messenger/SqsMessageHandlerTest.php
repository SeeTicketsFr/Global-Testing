<?php

namespace App\Tests\Messenger;

use App\Entity\Context;
use App\Entity\ContextSqsStep;
use App\Entity\Log;
use App\Entity\Scenario;
use App\Entity\SqsStep;
use App\Messenger\Enum\Logs;
use App\Messenger\Handler\Sqs\SqsLogs;
use App\Messenger\Handler\Sqs\SqsMessage;
use App\Messenger\Handler\Sqs\SqsMessageHandler;
use App\Tests\Functional\AbstractApiTestCase;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Messenger\Stamp\TransportNamesStamp;
use Symfony\Component\Messenger\Transport\InMemory\InMemoryTransport;
use Symfony\Component\Uid\Uuid;

class SqsMessageHandlerTest extends AbstractApiTestCase
{
    /**
     * @param array<array<string, mixed>> $stepsData
     */
    private function createSqsTestSetup(array $stepsData): SqsMessage
    {
        $idExecution = Uuid::v6();
        $scenario = new Scenario();
        $context = new Context($scenario, $idExecution);

        $steps = [];
        foreach ($stepsData as $stepData) {
            $step = new SqsStep();
            $step->setUrl(\is_string($stepData['url']) ? (string) $stepData['url'] : throw new \InvalidArgumentException('url must be a string'));
            $step->setRegion(\is_string($stepData['region']) ? (string) $stepData['region'] : throw new \InvalidArgumentException('region must be a string'));
            $step->setAccessKey(\is_string($stepData['accessKey']) ? (string) $stepData['accessKey'] : throw new \InvalidArgumentException('accessKey must be a string'));
            $step->setSecretKey(\is_string($stepData['secretKey']) ? (string) $stepData['secretKey'] : throw new \InvalidArgumentException('secretKey must be a string'));
            $step->setMessageGroupId(\is_string($stepData['messageGroupId']) ? (string) $stepData['messageGroupId'] : throw new \InvalidArgumentException('messageGroupId must be a string'));
            $step->setId(\is_string($stepData['id']) ? Uuid::fromString((string) $stepData['id']) : throw new \InvalidArgumentException('ID must be a string'));
            $step->setName(\is_string($stepData['name']) ? (string) $stepData['name'] : throw new \InvalidArgumentException('Name must be a string'));
            $step->setStepNumber(is_numeric($stepData['stepNumber']) ? (int) $stepData['stepNumber'] : 0);
            $step->setRunAfterFailure((bool) $stepData['runAfterFailure']);
            $step->setVariables(\is_array($stepData['variables']) ? $stepData['variables'] : []);

            $scenario->addStep($step);
            $context->addStep((new ContextSqsStep())->createContext($step));
            $steps[] = $step;
        }

        return new SqsMessage($steps[0], $context);
    }

    /**
     * Used by testSqsMessageHandlerOk.
     *
     * @return \Generator<string, array<mixed>>
     */
    public function valuesProviderSqsMessageHandlerOk(): \Generator
    {
        $sqsStep = $this->createSqsTestSetup([
            [
                'url' => 'https://sqs.us-east-2.amazonaws.com/123456789012/MyQueue',
                'region' => 'us-east-2',
                'accessKey' => 'accessKey',
                'secretKey' => 'secretKey',
                'messageGroupId' => 'messageGroupId',
                'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e04',
                'name' => 'Sqs step_1',
                'stepNumber' => 1,
                'runAfterFailure' => false,
                'variables' => ['variable1' => 'value1'],
            ],
        ]);
        if ($sqsStep->getContext()) {
            $sqsStep->getContext()->setSteps(new ArrayCollection());
        }
        yield 'SqsStep : step not in the context' => [
            'sqsMessage' => $sqsStep,
            'expectedLogs' => [
                Logs::BEGIN_STEP->getLog(['name' => 'Sqs step_1', 'handler' => SqsLogs::HANDLER_NAME->value]),
                Logs::ERROR_STEP->getLog(['name' => 'Sqs step_1', 'handler' => SqsLogs::HANDLER_NAME->value, 'message' => Logs::NO_STEP_IN_CONTEXT->getLog()]),
                Logs::END_STEP->getLog(['name' => 'Sqs step_1', 'handler' => SqsLogs::HANDLER_NAME->value]),
            ],
            'hasNextStep' => false,
            'dbQueryCount' => 11,
        ];

        yield 'SqsStep with no next step' => [
            'sqsMessage' => $this->createSqsTestSetup([
                [
                    'url' => 'https://sqs.us-east-2.amazonaws.com/123456789012/MyQueue',
                    'region' => 'us-east-2',
                    'accessKey' => 'accessKey',
                    'secretKey' => 'secretKey',
                    'messageGroupId' => 'messageGroupId',
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e04',
                    'name' => 'Sqs step_1',
                    'stepNumber' => 1,
                    'runAfterFailure' => false,
                    'variables' => ['variable1' => 'value1'],
                ],
            ]),
            'expectedLogs' => [
                Logs::BEGIN_STEP->getLog(['name' => 'Sqs step_1', 'handler' => SqsLogs::HANDLER_NAME->value]),
                Logs::END_STEP->getLog(['name' => 'Sqs step_1', 'handler' => SqsLogs::HANDLER_NAME->value]),
            ],
            'hasNextStep' => false,
            'dbQueryCount' => 8,
        ];

        yield 'SqsStep with next step' => [
            'sqsMessage' => $this->createSqsTestSetup([
                [
                    'url' => 'https://sqs.us-east-2.amazonaws.com/123456789012/MyQueue',
                    'region' => 'us-east-2',
                    'accessKey' => 'accessKey',
                    'secretKey' => 'secretKey',
                    'messageGroupId' => 'messageGroupId',
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e04',
                    'name' => 'Sqs step_1',
                    'stepNumber' => 1,
                    'runAfterFailure' => false,
                    'variables' => ['variable1' => 'value1'],
                ],
                [
                    'url' => 'https://sqs.us-east-2.amazonaws.com/123456789012/MyQueue',
                    'region' => 'us-east-2',
                    'accessKey' => 'accessKey',
                    'secretKey' => 'secretKey',
                    'messageGroupId' => 'messageGroupId',
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e05',
                    'name' => 'Sqs step_2',
                    'stepNumber' => 2,
                    'runAfterFailure' => false,
                    'variables' => ['variable2' => 'value2'],
                ],
            ]),
            'expectedLogs' => [
                Logs::BEGIN_STEP->getLog(['name' => 'Sqs step_1', 'handler' => SqsLogs::HANDLER_NAME->value]),
                Logs::END_STEP->getLog(['name' => 'Sqs step_1', 'handler' => SqsLogs::HANDLER_NAME->value]),
            ],
            'hasNextStep' => true,
            'dbQueryCount' => 7,
        ];
    }

    /**
     * @dataProvider valuesProviderSqsMessageHandlerOk
     *
     * @param array<string> $expectedLogs
     */
    public function testSqsMessageHandlerOk(SqsMessage $sqsMessage, array $expectedLogs, bool $hasNextStep, int $dbQueryCount): void
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

        // Send one SqsMessage
        $bus->dispatch($sqsMessage, [new TransportNamesStamp('messenger.transport.async')]);
        self::assertCount(1, $envelopes = $transport->getSent());

        // Rest the queue to delete this message
        $transport->reset();

        // Handle the message
        /** @var SqsMessageHandler $handler */
        $handler = $clientContainer->get(SqsMessageHandler::class);
        /** @var SqsMessage $message */
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

        $context = $sqsMessage->getContext();
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
