<?php

namespace App\Tests\Functional;

use App\Entity\ScenarioMetrics;
use App\Tests\Traits\TestCollectionGetTrait;
use App\Tests\Traits\TestItemGetTrait;
use App\Tests\Traits\TestItemUpdateTrait;

class ScenarioMetricsApiTest extends AbstractApiTestCase
{
    use TestCollectionGetTrait;
    use TestItemGetTrait;
    use TestItemUpdateTrait;

    final public const BASE_ROUTE = '/api/scenario_metricss';
    final public const RESSOURCE_CLASS = ScenarioMetrics::class;

    /**
     * Used by TestCollectionGetTrait::testCollectionGet.
     *
     * @return array<string, array<mixed>>
     */
    public function valuesProviderCollectionGet(): array
    {
        return [
            'Without Filter' => [null, 1, [], 3],
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
                '0c7b8a3d-8f32-4e3d-9d41-61a95b4d9d79',
                [
                    'id' => '0c7b8a3d-8f32-4e3d-9d41-61a95b4d9d79',
                    'totalExecutions' => 2,
                    'successExecutions' => 1,
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
                '0c7b8a3d-8f32-4e3d-9d41-61a95b4d9d79',
                [
                    'id' => '0c7b8a3d-8f32-4e3d-9d41-61a95b4d9d79',
                    'totalExecutions' => 20,
                    'successExecutions' => 17,
                ], null,
                6,
            ],
        ];
    }
}
