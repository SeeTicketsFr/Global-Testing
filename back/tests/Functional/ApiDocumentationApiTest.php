<?php

namespace App\Tests\Functional;

use App\Entity\ApiDocumentation;
use App\Tests\Traits\TestCollectionGetTrait;
use App\Tests\Traits\TestItemGetTrait;
use App\Tests\Traits\TestItemUpdateTrait;

class ApiDocumentationApiTest extends AbstractApiTestCase
{
    use TestCollectionGetTrait;
    use TestItemGetTrait;
    use TestItemUpdateTrait;

    final public const BASE_ROUTE = '/api/api_documentations';
    final public const RESSOURCE_CLASS = ApiDocumentation::class;

    /**
     * Used by TestCollectionGetTrait::testCollectionGet.
     *
     * @return array<string, array<mixed>>
     */
    public function valuesProviderCollectionGet(): array
    {
        return [
            'Without Filter' => [null, 5, [], 3],
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
                '1ee35bf0-d4ab-6220-996d-4143beb0712b',
                [
                    'id' => '1ee35bf0-d4ab-6220-996d-4143beb0712b',
                    'name' => 'API Documentation 1',
                    'url' => 'http://localhost/api.json',
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
                '1ee35bf0-d4ab-6220-996d-4143beb0712b',
                [
                    'id' => '1ee35bf0-d4ab-6220-996d-4143beb0712b',
                    'name' => 'Updated API Documentation',
                    'url' => 'http://localhost/updated_api.json',
                ], null,
                6,
            ],
        ];
    }
}
