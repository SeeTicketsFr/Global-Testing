<?php

namespace App\Tests\Functional;

use App\Entity\HttpStep;
use App\Tests\Traits\TestCollectionGetTrait;
use App\Tests\Traits\TestItemGetTrait;
use App\Tests\Traits\TestItemUpdateTrait;

class HttpStepApiTest extends AbstractApiTestCase
{
    use TestCollectionGetTrait;
    use TestItemGetTrait;
    use TestItemUpdateTrait;

    final public const BASE_ROUTE = '/api/http_steps';
    final public const RESSOURCE_CLASS = HttpStep::class;

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
                '016b1d91-75c5-6a0a-90b8-b781ff774a24',
                [
                    'id' => '016b1d91-75c5-6a0a-90b8-b781ff774a24',
                    'name' => 'Http step_1',
                    'stepNumber' => 1,
                    'variables' => [
                        'email' => 'globaltesting<<v:steps[1]:email_end>>',
                        'email_end' => '@seetickets.fr',
                        'api_url_endpoint' => '/api/authentication_token',
                    ],
                    'runAfterFailure' => false,
                    'method' => 'POST',
                    'url' => '<<v:scenario:api_url_path>><<v:steps[1]:api_url_endpoint>>',
                    'content' => [
                        'email' => '<<v:steps[1]:email>>',
                        'password' => 'password',
                    ],
                    'headers' => [
                        'x-app-info' => 'GlobalTesting-New#dev',
                        'Content-Type' => 'application/json',
                    ],
                    'checkConditions' => [
                        'statusCode' => '200',
                    ],
                    'treatment' => [
                        0 => [
                            'variableName' => 'varName',
                            'contentLocation' => 'contLocation',
                            'conditions' => [
                                'token' => '321',
                                'userId' => '123',
                            ],
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
                '016b1d91-75c5-6a0a-90b8-b781ff774a24',
                [
                    'id' => '016b1d91-75c5-6a0a-90b8-b781ff774a24',
                    'name' => 'Updated Http step_1',
                    'stepNumber' => 3,
                    'variables' => [
                        'email' => 'updated_globaltesting<<v:steps[1]:email_end>>',
                        'email_end' => '_updated@seetickets.fr',
                        'api_url_endpoint' => '/api/events',
                    ],
                    'runAfterFailure' => false,
                    'method' => 'GET',
                    'url' => '<<v:scenario:api_url_path>><<v:steps[1]:api_url_endpoint>>',
                    'content' => [
                        'email' => 'updated_<<v:steps[1]:email>>',
                        'password' => 'updated_password',
                    ],
                    'headers' => [
                        'x-app-info' => 'updated_GlobalTesting-New#dev',
                        'Content-Type' => 'application/ld+json',
                    ],
                    'checkConditions' => [
                        'statusCode' => '301',
                    ],
                    'treatment' => [
                        0 => [
                            'variableName' => 'updated_varName',
                            'contentLocation' => 'updated_contLocation',
                            'conditions' => [
                                'token' => '123',
                                'userId' => '321',
                            ],
                        ],
                    ],
                ], null,
                7,
            ],
        ];
    }
}
