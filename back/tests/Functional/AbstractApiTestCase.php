<?php

namespace App\Tests\Functional;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use ApiPlatform\Symfony\Bundle\Test\Client;
use App\Tests\SetUpFixturesTrait;
use Monolog\Handler\TestHandler;
use Monolog\Level;
use Symfony\Bridge\Doctrine\DataCollector\DoctrineDataCollector;
use Symfony\Bridge\Doctrine\Middleware\Debug\DebugDataHolder;
use Symfony\Component\HttpKernel\Profiler\Profiler;
use Symfony\Component\PropertyAccess\PropertyAccess;

abstract class AbstractApiTestCase extends ApiTestCase
{
    use SetUpFixturesTrait;

    protected static ?Client $client = null;

    /**
     * @param class-string $ressourceClass
     */
    public static function getClassShortName(string $ressourceClass): string
    {
        if (($apiResource = (new \ReflectionClass($ressourceClass))->getAttributes(ApiResource::class))
         && \is_array($apiResource) && \array_key_exists(0, $apiResource)
         && ($arguments = $apiResource[0]->getArguments())
         && \array_key_exists('shortName', $arguments)
        ) {
            return $arguments['shortName'];
        }

        return (new \ReflectionClass($ressourceClass))->getShortName();
    }

    /**
     * @param array<mixed> $values
     * @param array<mixed> $extraOptions
     *
     * @return array<mixed>
     */
    protected static function genCollectionJsonLD(string $testClassName, string $id, array $values = [], ?array $extraOptions = null): array
    {
        $baseRoute = $extraOptions['baseRoute'] ?? $testClassName::BASE_ROUTE;
        $ressourceClass = $extraOptions['ressourceClass'] ?? $testClassName::RESSOURCE_CLASS;
        $useGenId = $extraOptions['useGenId'] ?? false;
        $collection = [];
        if (!$useGenId) {
            $collection['@id'] = \sprintf('%s/%s', $baseRoute, $id);
        }

        return [
            ...$collection,
            '@type' => self::getClassShortName($ressourceClass),
            ...$values,
        ];
    }

    /**
     * @param array<mixed> $values
     *
     * @return array<mixed>
     */
    protected static function genItemJsonLD(string $testClassName, ?string $id, array $values): array
    {
        $classShortName = self::getClassShortName($testClassName::RESSOURCE_CLASS);
        $item = [];
        if (null !== $id) {
            $item['@id'] = \sprintf('%s/%s', $testClassName::BASE_ROUTE, $id);
        }

        return [
            '@context' => \sprintf('/api/contexts/%s', $classShortName),
            ...$item,
            '@type' => $classShortName,
            ...$values,
        ];
    }

    /**
     * @param array<mixed> $kernelOptions
     * @param array<mixed> $defaultOptions
     */
    protected static function createClient(array $kernelOptions = [], array $defaultOptions = []): Client
    {
        $client = parent::createClient($kernelOptions, $defaultOptions);
        $client->disableReboot();

        return $client;
    }

    /**
     * @param array<mixed> $kernelOptions
     * @param array<mixed> $defaultOptions
     */
    protected static function createPublicClient(array $kernelOptions = [], array $defaultOptions = [], bool $withProfiler = false): Client
    {
        $client = self::createClient($kernelOptions, $defaultOptions);
        self::$client = $client;
        if ($withProfiler) {
            self::$client->enableProfiler();
        }

        return self::$client;
    }

    protected static function assertCountDbQueryCount(int $count): void
    {
        if (!self::$client instanceof Client) {
            throw new \RuntimeException('For use assertCountDbQueryCount, you must enable the $withProfiler in client construct');
        }

        $clientProfile = self::$client->getProfile();
        if (false !== $clientProfile) {
            /** @var DoctrineDataCollector $doctrineDatacollector */
            $doctrineDatacollector = $clientProfile->getCollector('db');
            // dd('count : ', $count, '------------------ $doctrineDatacollector->getQueryCount() : ', $doctrineDatacollector->getQueryCount());
            // dd(\array_map(fn($query) => ['sql' => $query['sql'], 'params' => $query['params']->getValue(true)], $doctrineDatacollector->getQueries()['default']));
            self::assertEquals($count, $doctrineDatacollector->getQueryCount(), 'Expecting DB queries');
        }
    }

    /**
     * @param array<string> $properties
     */
    public static function assertEntityEquals(?object $expected, ?object $actual, array $properties): void
    {
        if (null === $expected) {
            self::assertNull($actual);

            return;
        }

        self::assertNotNull($actual);
        $accessor = PropertyAccess::createPropertyAccessor();
        foreach ($properties as $property) {
            self::assertEquals($accessor->getValue($expected, $property), $accessor->getValue($actual, $property));
        }
    }

    protected static function assertIsLogged(string $partOfMessage, Level $level): void
    {
        if (!self::$client) {
            throw new \RuntimeException('Client is not initialized.');
        }

        $clientContainer = self::$client->getContainer();

        if (!$clientContainer) {
            throw new \RuntimeException('Client container is not available.');
        }

        /** @var TestHandler $testHandler */
        $testHandler = $clientContainer->get('monolog.handler.main');

        // Assert that the log record contains the expected message and level
        self::assertTrue($testHandler->hasRecordThatContains($partOfMessage, $level));
    }

    protected static function assertIsLoggedWithoutClient(string $partOfMessage, Level $level): void
    {
        /** @var TestHandler $testHandler */
        $testHandler = self::getContainer()->get('monolog.handler.main');
        // dd($partOfMessage, $testHandler->getRecords());
        self::assertTrue($testHandler->hasRecordThatContains($partOfMessage, $level));
    }

    protected static function assertCountDbQueryCountWithoutClient(int $count): void
    {
        /** @var Profiler $profiler */
        $profiler = self::getContainer()->get('profiler');
        /** @var DoctrineDataCollector $doctrineDatacollector */
        $doctrineDatacollector = $profiler->get('db');
        /** @var \ReflectionClass<DoctrineDataCollector> $reflectionObjectParent */
        $reflectionObjectParent = (new \ReflectionObject($doctrineDatacollector))->getParentClass();
        $reflectionProperty = $reflectionObjectParent->getProperty('debugDataHolder');
        $reflectionProperty->setAccessible(true);
        $value = $reflectionProperty->getValue($doctrineDatacollector);

        if (!($value instanceof DebugDataHolder)) {
            return;
        }
        $queries = $value->getData()['default'];
        // dd(array_map(fn ($query) => ['sql' => $query['sql'], 'params' => $query['params']], $queries));
        self::assertCount($count, $queries);
    }
}
