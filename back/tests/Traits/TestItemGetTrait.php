<?php

namespace App\Tests\Traits;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

trait TestItemGetTrait
{
    /**
     * @dataProvider valuesProviderItemGet
     *
     * @param array<mixed> $value
     * @param array<mixed> $extraOptions
     */
    public function testItemGet(string $id, array $value, int $dbQueryCount, ?array $extraOptions = null): void
    {
        $client = self::createPublicClient(withProfiler: true);

        $useJsonContains = $extraOptions['useJsonContains'] ?? false;
        $disableMatchesResourceCollectionJsonSchema = $extraOptions['disableMatchesResourceCollectionJsonSchema'] ?? false;

        $client->request(Request::METHOD_GET, \sprintf('%s/%s', self::BASE_ROUTE, $id));
        // dd($response->toArray());

        self::assertResponseIsSuccessful();
        self::assertResponseStatusCodeSame(Response::HTTP_OK);
        if (!$disableMatchesResourceCollectionJsonSchema) {
            self::assertMatchesResourceItemJsonSchema(self::RESSOURCE_CLASS);
        }

        $jsonLd = self::genItemJsonLD(self::class, $id, $value);
        if ($useJsonContains) {
            self::assertJsonContains($jsonLd);
        } else {
            self::assertJsonEquals($jsonLd);
        }

        self::assertCountDbQueryCount($dbQueryCount);
    }
}
