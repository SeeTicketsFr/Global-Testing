<?php

namespace App\Tests\Functional;

use App\Entity\SqsStep;
use App\Tests\Traits\TestCollectionGetTrait;
use App\Tests\Traits\TestItemGetTrait;
use App\Tests\Traits\TestItemUpdateTrait;

class SqsStepApiTest extends AbstractApiTestCase
{
    use TestCollectionGetTrait;
    use TestItemGetTrait;
    use TestItemUpdateTrait;

    final public const BASE_ROUTE = '/api/sqs_steps';
    final public const RESSOURCE_CLASS = SqsStep::class;

    /**
     * Used by TestCollectionGetTrait::testCollectionGet.
     *
     * @return array<string, array<mixed>>
     */
    public function valuesProviderCollectionGet(): array
    {
        return [
            'Without Filter' => [null, 2, [], 3],
        ];
    }

    /**
     * Used by TestItemGetTrait::testItemGet.
     *
     * @return array<string, array<mixed>>
     */
    public function valuesProviderItemGet(): array
    {
        return [
            'Simple' => [
                '9a6ee19f-c799-4c19-a83f-83d8c8d00e06',
                [
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e06',
                    'name' => 'Sqs step_1',
                    'stepNumber' => 7,
                    'variables' => [
                        'hello' => 'world',
                    ],
                    'runAfterFailure' => false,
                    'url' => 'sqsUrl',
                    'region' => 'region',
                    'accessKey' => 'accessKey',
                    'secretKey' => 'secretKey',
                    'messageGroupId' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e58',
                    'content' => [
                        'hello' => 'world',
                    ],
                ],
                2,
                ['useJsonContains' => true],
            ],
        ];
    }

    /**
     * Used by TestItemUpdateTrait::testItemUpdate.
     *
     * @return array<string, array<mixed>>
     */
    public function valuesProviderItemUpdateOk(): array
    {
        return [
            'Simple' => [
                '9a6ee19f-c799-4c19-a83f-83d8c8d00e06',
                [
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e06',
                    'name' => 'Updated Sqs step_1',
                    'stepNumber' => 8,
                    'variables' => [
                        'updated_hello' => 'updated_world',
                    ],
                    'runAfterFailure' => true,
                    'url' => 'updated_sqsUrl',
                    'region' => 'updated_region',
                    'accessKey' => 'updated_accessKey',
                    'secretKey' => 'updated_secretKey',
                    'messageGroupId' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e59',
                    'content' => [
                        'updated_hello' => 'updated_world',
                    ],
                ], null,
                7,
            ],
        ];
    }
}
