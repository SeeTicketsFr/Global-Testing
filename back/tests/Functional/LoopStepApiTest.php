<?php

namespace App\Tests\Functional;

use App\Entity\LoopStep;
use App\Tests\Traits\TestCollectionGetTrait;
use App\Tests\Traits\TestItemGetTrait;
use App\Tests\Traits\TestItemUpdateTrait;

class LoopStepApiTest extends AbstractApiTestCase
{
    use TestCollectionGetTrait;
    use TestItemGetTrait;
    use TestItemUpdateTrait;

    final public const BASE_ROUTE = '/api/loop_steps';
    final public const RESSOURCE_CLASS = LoopStep::class;

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
                '016b1d91-a7f1-6728-90bc-ae10cbff93cb',
                [
                    'id' => '016b1d91-a7f1-6728-90bc-ae10cbff93cb',
                    'name' => 'Loop step_1',
                    'stepNumber' => 3,
                    'variables' => [
                        'hello' => 'world',
                    ],
                    'runAfterFailure' => false,
                    'stepToReturn' => 1,
                    'conditions' => [
                        0 => [
                            'dynamicValue' => '<<v:steps[2]:count>>',
                            'defaultValue' => 0,
                            'value' => 1,
                        ],
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
                '016b1d91-a7f1-6728-90bc-ae10cbff93cb',
                [
                    'id' => '016b1d91-a7f1-6728-90bc-ae10cbff93cb',
                    'name' => 'Updated Loop step_1',
                    'stepNumber' => 4,
                    'variables' => [
                        'updated_hello' => 'updated_world',
                    ],
                    'runAfterFailure' => true,
                    'stepToReturn' => 2,
                    'conditions' => [
                        0 => [
                            'dynamicValue' => 'updated_<<v:steps[2]:count>>',
                            'defaultValue' => 1,
                            'value' => 2,
                        ],
                    ],
                ], null,
                7,
            ],
        ];
    }
}
