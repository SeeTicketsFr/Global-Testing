<?php

namespace App\Tests\Functional;

use App\Entity\Scenario;
use App\Tests\Traits\TestCollectionGetTrait;
use App\Tests\Traits\TestItemGetTrait;
use App\Tests\Traits\TestItemUpdateTrait;

class ScenarioApiTest extends AbstractApiTestCase
{
    use TestCollectionGetTrait;
    use TestItemGetTrait;
    use TestItemUpdateTrait;

    final public const BASE_ROUTE = '/api/scenarios';
    final public const RESSOURCE_CLASS = Scenario::class;

    /**
     * Used by TestCollectionGetTrait::testCollectionGet.
     *
     * @return array<string, array<mixed>>
     */
    public function valuesProviderCollectionGet(): array
    {
        return [
            'Without Filter' => [null, 2, [], 4],
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
                '016b1d91-a8df-6a09-90c2-56d8e6ef1fb6',
                [
                    'id' => '016b1d91-a8df-6a09-90c2-56d8e6ef1fb6',
                    'name' => 'Scenario 1',
                    'variables' => [
                        'api_url_path' => 'https://url.domain.net/api',
                    ],
                    'cron' => '* * * * *',
                    'steps' => [
                        0 => [
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
                        1 => [
                            'id' => '9c86d386-5d0a-4db9-86f9-4c160a3ebaa8',
                            'name' => 'Http step_2',
                            'stepNumber' => 2,
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
                                    'variableName' => 'varName2',
                                    'contentLocation' => 'contLocation2',
                                    'conditions' => [
                                        'token' => '678',
                                        'userId' => '456',
                                    ],
                                ],
                            ],
                        ],
                        2 => [
                            'id' => '016b1d91-a7f1-6728-90bc-ae10cbff93cb',
                            'name' => 'Loop step_1',
                            'stepNumber' => 3,
                            'variables' => [
                                'hello' => 'world',
                            ],
                            'runAfterFailure' => false,
                            'conditions' => [
                                0 => [
                                    'dynamicValue' => '<<v:steps[2]:count>>',
                                    'defaultValue' => 0,
                                    'value' => 1,
                                ],
                            ],
                            'stepToReturn' => 1,
                        ],
                        3 => [
                            'id' => '016b1d91-a7f1-6728-90bc-ae10cbff93cc',
                            'name' => 'Loop step_2',
                            'stepNumber' => 4,
                            'variables' => [
                                'hello' => 'world',
                            ],
                            'runAfterFailure' => false,
                            'conditions' => [
                                0 => [
                                    'dynamicValue' => '<<r:steps[1]:content[user][id]>>',
                                    'value' => '1eeda308-58fc-6c3c-b6ad-8986caf87262',
                                ],
                            ],
                            'stepToReturn' => 1,
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
                '016b1d91-a8df-6a09-90c2-56d8e6ef1fb6',
                [
                    'id' => '016b1d91-a8df-6a09-90c2-56d8e6ef1fb6',
                    'name' => 'Updated Scenario 1',
                    'variables' => [
                        'api_url_path' => 'https://updated_url.domain.net/api',
                    ],
                    'cron' => '1 * * * *',
                    'steps' => [],
                ], null,
                7,
            ],
        ];
    }
}
