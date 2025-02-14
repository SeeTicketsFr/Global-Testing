<?php

namespace App\Tests\Functional;

use App\Entity\Enum\WebhookEventType;
use App\Entity\Webhook;
use App\Tests\Traits\TestCollectionGetTrait;
use App\Tests\Traits\TestItemGetTrait;
use App\Tests\Traits\TestItemUpdateTrait;

class WebhookApiTest extends AbstractApiTestCase
{
    use TestCollectionGetTrait;
    use TestItemGetTrait;
    use TestItemUpdateTrait;

    final public const BASE_ROUTE = '/api/webhooks';
    final public const RESSOURCE_CLASS = Webhook::class;

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
                '1ee35bf0-d4ab-6220-996d-4143beb0724e',
                [
                    'id' => '1ee35bf0-d4ab-6220-996d-4143beb0724e',
                    'eventType' => WebhookEventType::ON_FAILURE->value,
                    'url' => 'https://url.domain.net/api',
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
                '1ee35bf0-d4ab-6220-996d-4143beb0724e',
                [
                    'id' => '1ee35bf0-d4ab-6220-996d-4143beb0724e',
                    'eventType' => WebhookEventType::ON_SUCCESS->value,
                    'url' => 'https://url.domain.net/v2/api',
                ], null,
                6,
            ],
        ];
    }
}
