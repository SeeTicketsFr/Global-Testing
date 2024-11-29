<?php

namespace App\Tests\Traits;

use Symfony\Component\HttpFoundation\Request;

trait TestItemUpdateTrait
{
    /**
     * @dataProvider valuesProviderItemUpdateOk
     *
     * @param array<mixed>      $value
     * @param array<mixed>      $json
     * @param array<mixed>|null $extraOptions
     */
    public function testItemUpdate(string $id, array $value, ?array $json, int $dbQueryCount, ?array $extraOptions = null): void
    {
        $newId = $extraOptions['newId'] ?? null;

        $client = self::createPublicClient(withProfiler: true);
        $response = $client->request(Request::METHOD_PATCH, \sprintf('%s/%s', self::BASE_ROUTE, $id), [
            'headers' => [
                'content-type' => 'application/merge-patch+json',
            ],
            'json' => $value,
        ]);
        if (null === $json) {
            $json = $value;
        }
        /*         dd($response->toArray(), self::genItemJsonLD(self::class, null, $json));
         */
        self::assertResponseIsSuccessful();
        self::assertJsonContains(self::genItemJsonLD(self::class, \is_string($newId) ? $newId : $id, $json));
        self::assertCountDbQueryCount($dbQueryCount);

        if (null !== $extraOptions && \array_key_exists('afterUpdateHandler', $extraOptions)) {
            $extraOptions['afterUpdateHandler']($client);
        }
    }
}
