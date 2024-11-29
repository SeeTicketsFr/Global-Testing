<?php

namespace App\Tests\Functional;

use App\Entity\SleepStep;
use App\Tests\Traits\TestCollectionGetTrait;
use App\Tests\Traits\TestItemGetTrait;
use App\Tests\Traits\TestItemUpdateTrait;

class SleepStepApiTest extends AbstractApiTestCase
{
    use TestCollectionGetTrait;
    use TestItemGetTrait;
    use TestItemUpdateTrait;

    final public const BASE_ROUTE = '/api/sleep_steps';
    final public const RESSOURCE_CLASS = SleepStep::class;

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
                '9a6ee19f-c799-4c19-a83f-83d8c8d00e04',
                [
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e04',
                    'name' => 'Sleep step_1',
                    'stepNumber' => 5,
                    'variables' => [
                        'hello' => 'world',
                    ],
                    'runAfterFailure' => false,
                    'duration' => 3000,
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
                '9a6ee19f-c799-4c19-a83f-83d8c8d00e04',
                [
                    'id' => '9a6ee19f-c799-4c19-a83f-83d8c8d00e04',
                    'name' => 'Updated Sleep step_1',
                    'stepNumber' => 6,
                    'variables' => [
                        'updated_hello' => 'updated_world',
                    ],
                    'runAfterFailure' => true,
                    'duration' => 4000,
                ], null,
                7,
            ],
        ];
    }
}
