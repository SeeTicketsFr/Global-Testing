<?php

namespace App\Tests\Messenger;

use App\Entity\Context;
use App\Entity\ContextHttpStep;
use App\Entity\Enum\HttpMethodsType;
use App\Entity\HttpStep;
use App\Entity\Log;
use App\Entity\Scenario;
use App\Messenger\Enum\Logs;
use App\Messenger\Handler\Http\HttpLogs;
use App\Messenger\Handler\Http\HttpMessage;
use App\Messenger\Handler\Http\HttpMessageHandler;
use App\Tests\Functional\AbstractApiTestCase;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Messenger\Stamp\TransportNamesStamp;
use Symfony\Component\Messenger\Transport\InMemory\InMemoryTransport;
use Symfony\Component\Uid\Uuid;

class HttpMessageHandlerTest extends AbstractApiTestCase
{
    /**
     * @param array<array<string, mixed>> $stepsData
     */
    private function createHttpTestSetup(array $stepsData): HttpMessage
    {
        $idExecution = Uuid::v6();
        $scenario = new Scenario();
        $context = new Context($scenario, $idExecution);

        $steps = [];
        foreach ($stepsData as $stepData) {
            $step = new HttpStep();

            $step->setUrl(\is_string($stepData['url']) ? (string) $stepData['url'] : throw new \InvalidArgumentException('URL must be a string'));
            $step->setMethod(($stepData['method'] instanceof HttpMethodsType) ? $stepData['method'] : throw new \InvalidArgumentException('Method must be an instance of HttpMethodsType'));
            $step->setTreatment(\is_array($stepData['treatment']) ? $stepData['treatment'] : null);
            $step->setId(\is_string($stepData['id']) ? Uuid::fromString((string) $stepData['id']) : throw new \InvalidArgumentException('ID must be a string'));
            $step->setName(\is_string($stepData['name']) ? (string) $stepData['name'] : throw new \InvalidArgumentException('Name must be a string'));
            $step->setStepNumber(is_numeric($stepData['stepNumber']) ? (int) $stepData['stepNumber'] : 0);
            $step->setRunAfterFailure((bool) $stepData['runAfterFailure']);
            $step->setVariables(\is_array($stepData['variables']) ? $stepData['variables'] : []);

            $scenario->addStep($step);
            $context->addStep((new ContextHttpStep())->createContext($step));
            $steps[] = $step;
        }

        return new HttpMessage($steps[0], $context);
    }

    /**
     * Used by testHttpMessageHandlerOk.
     *
     * @return \Generator<string, array<mixed>>
     */
    public function valuesProviderHttpMessageHandlerOk(): \Generator
    {
        yield 'HttpStep : http request error' => [
            'httpMessage' => $this->createHttpTestSetup([
                [
                    'url' => 'http://xyz.abc/api',
                    'method' => HttpMethodsType::GET,
                    'treatment' => [],
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e04',
                    'name' => 'Http step_1',
                    'stepNumber' => 1,
                    'runAfterFailure' => false,
                    'variables' => ['variable1' => 'value1'],
                ],
            ]),
            'expectedLogs' => [
                Logs::BEGIN_STEP->getLog(['name' => 'Http step_1', 'handler' => HttpLogs::HANDLER_NAME->value]),
                Logs::ERROR_STEP->getLog(['name' => 'Http step_1', 'handler' => HttpLogs::HANDLER_NAME->value, 'message' => 'Could not resolve host: xyz.abc for "http://xyz.abc/api".']),
                Logs::END_STEP->getLog(['name' => 'Http step_1', 'handler' => HttpLogs::HANDLER_NAME->value]),
            ],
            'hasNextStep' => false,
            'dbQueryCount' => 11,
        ];

        $httpStep = $this->createHttpTestSetup([
            [
                'url' => 'https://www.php.net/',
                'method' => HttpMethodsType::GET,
                'treatment' => [],
                'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e04',
                'name' => 'Http step_1',
                'stepNumber' => 1,
                'runAfterFailure' => false,
                'variables' => ['variable1' => 'value1'],
            ],
        ]);
        if ($httpStep->getContext()) {
            $httpStep->getContext()->setSteps(new ArrayCollection());
        }
        yield 'HttpStep : step not in the context' => [
            'httpMessage' => $httpStep,
            'expectedLogs' => [
                Logs::BEGIN_STEP->getLog(['name' => 'Http step_1', 'handler' => HttpLogs::HANDLER_NAME->value]),
                Logs::ERROR_STEP->getLog(['name' => 'Http step_1', 'handler' => HttpLogs::HANDLER_NAME->value, 'message' => Logs::NO_STEP_IN_CONTEXT->getLog()]),
                Logs::END_STEP->getLog(['name' => 'Http step_1', 'handler' => HttpLogs::HANDLER_NAME->value]),
            ],
            'hasNextStep' => false,
            'dbQueryCount' => 11,
        ];

        yield 'HttpStep : without next step' => [
            'httpMessage' => $this->createHttpTestSetup([
                [
                    'url' => 'https://www.php.net/',
                    'method' => HttpMethodsType::GET,
                    'treatment' => [],
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e04',
                    'name' => 'Http step_1',
                    'stepNumber' => 1,
                    'runAfterFailure' => false,
                    'variables' => ['variable1' => 'value1'],
                ],
            ]),
            'expectedLogs' => [
                Logs::BEGIN_STEP->getLog(['name' => 'Http step_1', 'handler' => HttpLogs::HANDLER_NAME->value]),
                Logs::END_STEP->getLog(['name' => 'Http step_1', 'handler' => HttpLogs::HANDLER_NAME->value]),
            ],
            'hasNextStep' => false,
            'dbQueryCount' => 8,
        ];

        yield 'HttpStep : with next step' => [
            'httpMessage' => $this->createHttpTestSetup([
                [
                    'url' => 'https://www.php.net/',
                    'method' => HttpMethodsType::GET,
                    'treatment' => [],
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e04',
                    'name' => 'Http step_1',
                    'stepNumber' => 1,
                    'runAfterFailure' => false,
                    'variables' => ['variable1' => 'value1'],
                ],
                [
                    'url' => 'https://www.php.net/',
                    'method' => HttpMethodsType::GET,
                    'treatment' => [],
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e05',
                    'name' => 'Http step_2',
                    'stepNumber' => 2,
                    'runAfterFailure' => false,
                    'variables' => ['variable2' => 'value2'],
                ],
            ]),
            'expectedLogs' => [
                Logs::BEGIN_STEP->getLog(['name' => 'Http step_1', 'handler' => HttpLogs::HANDLER_NAME->value]),
                Logs::END_STEP->getLog(['name' => 'Http step_1', 'handler' => HttpLogs::HANDLER_NAME->value]),
            ],
            'hasNextStep' => true,
            'dbQueryCount' => 7,
        ];
    }

    /**
     * @dataProvider valuesProviderHttpMessageHandlerOk
     *
     * @param array<string> $expectedLogs
     */
    public function testHttpMessageHandlerOk(HttpMessage $httpMessage, array $expectedLogs, bool $hasNextStep, int $dbQueryCount): void
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

        // Send one HttpMessage
        $bus->dispatch($httpMessage, [new TransportNamesStamp('messenger.transport.async')]);
        self::assertCount(1, $envelopes = $transport->getSent());

        // Rest the queue to delete this message
        $transport->reset();

        // Handle the message
        /** @var HttpMessageHandler $handler */
        $handler = $clientContainer->get(HttpMessageHandler::class);
        /** @var HttpMessage $message */
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

        $context = $httpMessage->getContext();
        if (null === $context) {
            self::fail('The context is null, cannot retrieve idExecution.');
        }
        $idExecution = $context->getIdExecution()->toString();

        /**
         * @var Log[] $logs
         */
        $logs = $entityRepository->findBy(['idExecution' => $idExecution]);

        // $this->assertEquals(count($expectedLogs), \count($logs));

        $humanDescriptions = array_map(
            static fn (Log $log) => $log->getHumanDescription(),
            $logs
        );
        self::assertEquals($expectedLogs, $humanDescriptions);
    }
}
