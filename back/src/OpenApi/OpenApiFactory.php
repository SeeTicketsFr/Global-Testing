<?php

namespace App\OpenApi;

use ApiPlatform\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\OpenApi\Model\MediaType;
use ApiPlatform\OpenApi\Model\Operation;
use ApiPlatform\OpenApi\Model\Parameter;
use ApiPlatform\OpenApi\Model\PathItem;
use ApiPlatform\OpenApi\Model\RequestBody;
use ApiPlatform\OpenApi\Model\Response as ModelResponse;
use ApiPlatform\OpenApi\OpenApi;
use Symfony\Component\HttpFoundation\Response;

/**
 * @codeCoverageIgnore
 */
final readonly class OpenApiFactory implements OpenApiFactoryInterface
{
    public function __construct(private OpenApiFactoryInterface $decorated)
    {
    }

    /**
     * @param array<mixed> $context
     */
    public function __invoke(array $context = []): OpenApi
    {
        $openApi = $this->decorated->__invoke($context);
        /** @var \ApiPlatform\OpenApi\Model\Info $info */
        $info = $openApi->getInfo();
        $info->withExtensionProperty('info-key', 'Info value') // @phpstan-ignore-line
             ->withExtensionProperty('key', 'Custom x-key value')
             ->withExtensionProperty('x-value', 'Custom x-value value');

        // Components Schemas
        $components = $openApi->getComponents();
        /** @var \ArrayObject<string, array<string, string>> $schemas */
        $schemas = $components->getSchemas();

        $schemas['ScenarioExecution'] = new \ArrayObject([  // @phpstan-ignore-line
            'scenarioId' => ['type' => 'string', 'format' => 'uuid'],
            'executionId' => ['type' => 'string', 'format' => 'uuid'],
        ]);

        $schemas['Log'] = new \ArrayObject([   // @phpstan-ignore-line
            'type' => 'object',
            'properties' => [
                'id' => ['type' => 'string', 'format' => 'uuid'],
                'idExecution' => ['type' => 'string', 'format' => 'uuid'],
                'idScenario' => ['type' => 'string', 'format' => 'uuid'],
                'idStep' => ['type' => 'string', 'format' => 'uuid'],
                'humanDescription' => ['type' => 'string'],
                'step' => [
                    'oneOf' => [
                        ['type' => 'null'],
                        ['$ref' => '#/components/schemas/LogHttpStep.jsonld'],
                        ['$ref' => '#/components/schemas/LogLoopStep.jsonld'],
                        ['$ref' => '#/components/schemas/LogSleepStep.jsonld'],
                        ['$ref' => '#/components/schemas/LogSqsStep.jsonld'],
                    ],
                ],
                'createdAt' => ['type' => 'string', 'format' => 'date-time'],
            ],
        ]);

        $modifyStepsProperty = new \ArrayObject([
            'type' => 'array',
            'items' => [
                'oneOf' => [
                    ['$ref' => '#/components/schemas/HttpStep'],
                    ['$ref' => '#/components/schemas/LoopStep'],
                    ['$ref' => '#/components/schemas/SleepStep'],
                    ['$ref' => '#/components/schemas/SqsStep'],
                ],
            ],
        ]);

        $schemaKey = 'Scenario.jsonld-scenario.read_step.read_httpstep.read_loopstep.read_sleepstep.read';
        $schemaValue = $schemas[$schemaKey] ?? [];

        $properties = $schemaValue['properties'] ?? [];
        if (!\is_array($properties)) {
            throw new \RuntimeException(\sprintf('The value of the "properties" key in the "%s" schema is not an array.', $schemaKey));
        }

        $properties['steps'] = $modifyStepsProperty;
        $schemaValue['properties'] = $properties;

        $modifyStepsProperty = new \ArrayObject([
            'oneOf' => [
                ['$ref' => '#/components/schemas/LogHttpStep.jsonld'],
                ['$ref' => '#/components/schemas/LogLoopStep.jsonld'],
                ['$ref' => '#/components/schemas/LogSleepStep.jsonld'],
                ['$ref' => '#/components/schemas/LogSqsStep.jsonld'],
            ],
        ]);

        $schemaKey = 'Log.jsonld-log.read_step.read_httpstep.read_loopstep.read_sleepstep.read';
        $schemaValue = $schemas[$schemaKey] ?? [];

        $properties = $schemaValue['properties'] ?? [];
        if (!\is_array($properties)) {
            throw new \RuntimeException(\sprintf('The value of the "properties" key in the "%s" schema is not an array.', $schemaKey));
        }

        $properties['step'] = $modifyStepsProperty;
        $schemaValue['properties'] = $properties;
        $schemas[$schemaKey] = new \ArrayObject($schemaValue); // @phpstan-ignore-line

        $schemas->ksort();

        $openApi->withComponents(
            $components->withSchemas($schemas)
        );

        $openApi->getPaths()->addPath('/api/scenario/{scenarioId}/run', (new PathItem())->withGet((new Operation())
        ->withOperationId('runScenario')
        ->withTags(['Scenario'])
        ->withParameter(new Parameter(name: 'scenarioId', in: 'path', schema: ['type' => 'string', 'format' => 'uuid']))
        ->withSummary('Run Scenario')
        ->withResponses([
            Response::HTTP_OK => (new ModelResponse())
                ->withDescription('Scenario run successfully')
                ->withContent(new \ArrayObject([
                    'application/json' => new MediaType(new \ArrayObject(new \ArrayObject([
                        '$ref' => '#/components/schemas/ScenarioExecution',
                    ]))),
                ])),
        ])
        ));

        $openApi->getPaths()->addPath('/api/scenario/import', (new PathItem())->withPost((new Operation())
            ->withOperationId('importScenario')
            ->withTags(['Scenario'])
            ->withSummary('Import Scenario')
            ->withRequestBody((new RequestBody())
                ->withDescription('Scenario')
                ->withRequired(true)
                ->withContent(new \ArrayObject([
                    'application/json' => new MediaType(new \ArrayObject(new \ArrayObject([
                        'type' => 'object',
                        'properties' => [],
                    ]))),
                ]))
            )
            ->withResponses([
                Response::HTTP_OK => ['description' => 'Import successful'],
            ])
        ));

        /*         $openApi->getPaths()->addPath('/api/logs/scenarios/{idScenario}', (new PathItem())->withGet((new Operation())
                    ->withOperationId('getLogsByScenarioId')
                    ->withTags(['Log'])
                    ->withParameter(new Parameter(name: 'idScenario', in: 'path', schema: ['type' => 'string', 'format' => 'uuid']))
                    ->withSummary('Get logs by scenario ID')
                    ->withResponses([
                        Response::HTTP_OK => (new ModelResponse())
                            ->withDescription('Logs retrieved successfully')
                            ->withContent(new \ArrayObject([
                                'application/ld+json' => new MediaType(new \ArrayObject(new \ArrayObject([
                                    'type' => 'array',
                                    'items' => [
                                        '$ref' => '#/components/schemas/Log',
                                    ],
                                ]))),
                            ])),
                        Response::HTTP_UNAUTHORIZED => (new ModelResponse())->withDescription('Unauthorized'),
                        Response::HTTP_BAD_REQUEST => (new ModelResponse())->withDescription('Invalid query'),
                        Response::HTTP_FORBIDDEN => (new ModelResponse())->withDescription('Forbidden'),
                    ])
                )); */

        /** @var PathItem $pathItem */
        foreach ($openApi->getPaths()->getPaths() as $pathItem) {
            /** @var Operation $operation */
            foreach ([$pathItem->getGet(), $pathItem->getPost(), $pathItem->getPatch(), $pathItem->getPut(), $pathItem->getDelete(), $pathItem->getHead()] as $operation) {
                if ($operation instanceof Operation) {
                    $operation->addResponse(new ModelResponse('Unauthorized'), Response::HTTP_UNAUTHORIZED);
                    $operation->addResponse(new ModelResponse('Invalid query'), Response::HTTP_BAD_REQUEST);
                    $operation->addResponse(new ModelResponse('Forbidden'), Response::HTTP_FORBIDDEN);
                }
            }
        }

        return $openApi;
    }
}
