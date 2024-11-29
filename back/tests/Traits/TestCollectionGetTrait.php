<?php

namespace App\Tests\Traits;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

trait TestCollectionGetTrait
{
    /**
     * @dataProvider valuesProviderCollectionGet
     *
     * @param array<mixed>|null $optionQuery
     * @param array<mixed>      $idsOrValues
     * @param array<mixed>|null $extraOptions
     */
    public function testCollectionGet(?array $optionQuery, int $count, array $idsOrValues, int $dbQueryCount, ?array $extraOptions = null): void
    {
        $baseRoute = $extraOptions['baseRoute'] ?? self::BASE_ROUTE;
        $subRoute = $extraOptions['subRoute'] ?? false;
        $ressourceClass = $extraOptions['ressourceClass'] ?? self::RESSOURCE_CLASS;
        $useArraySubset = $extraOptions['useArraySubset'] ?? false;
        $operationName = $extraOptions['operationName'] ?? null;
        $useGenId = $extraOptions['useGenId'] ?? false;
        $disableMatchesResourceCollectionJsonSchema = $extraOptions['disableMatchesResourceCollectionJsonSchema'] ?? false;

        $client = self::createPublicClient(withProfiler: true);

        $options = [];
        if (null !== $optionQuery) {
            $options['query'] = $optionQuery;
        }

        $response = $client->request(Request::METHOD_GET, false !== $subRoute ? $subRoute : $baseRoute, $options);

        self::assertResponseIsSuccessful();
        self::assertResponseStatusCodeSame(Response::HTTP_OK);
        if (!$disableMatchesResourceCollectionJsonSchema) {
            self::assertMatchesResourceCollectionJsonSchema($ressourceClass, $operationName);
        }

        $jsonLdReturned = $response->toArray();
        // dd($jsonLdReturned);

        self::assertArrayHasKey('hydra:totalItems', $jsonLdReturned);
        // dd('count : ', $count, ' ---------- totalItems : ', $jsonLdReturned['hydra:totalItems']);
        self::assertEquals($count, $jsonLdReturned['hydra:totalItems']);
        self::assertArrayHasKey('hydra:member', $jsonLdReturned);
        self::assertCount($count, $jsonLdReturned['hydra:member']);

        $i = 0;

        foreach ($idsOrValues as $key => $value) {
            self::assertArrayHasKey($i, $jsonLdReturned['hydra:member']);
            if (\is_int($key) && !\is_array($value)) { // Only id provide
                if ($useGenId) {
                    self::assertEquals($value, $jsonLdReturned['hydra:member'][$i++]['id']);
                } else {
                    $strBaseRoute = \is_string($baseRoute) ? $baseRoute : '';
                    $strValue = \is_string($value) ? $value : '';

                    self::assertEquals(
                        \sprintf('%s/%s', $strBaseRoute, $strValue),
                        $jsonLdReturned['hydra:member'][$i++]['@id']
                    );
                }
            } else {
                $jsonLd = self::genCollectionJsonLD(self::class, $key, \is_array($value) ? $value : [], $extraOptions);
                if ($useArraySubset) {
                    self::assertArraySubset($jsonLd, $jsonLdReturned['hydra:member'][$i++]);
                } else {
                    self::assertEquals($jsonLd, $jsonLdReturned['hydra:member'][$i++]);
                }
            }
        }

        self::assertCountDbQueryCount($dbQueryCount);
    }
}
