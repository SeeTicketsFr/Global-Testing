<?php

namespace App\Tests;

use Doctrine\DBAL\Connection;
use Doctrine\Persistence\ManagerRegistry;
use Hautelook\AliceBundle\PhpUnit\BaseDatabaseTrait;
use Symfony\Component\HttpKernel\KernelInterface;

trait SetUpFixturesTrait
{
    use BaseDatabaseTrait;

    /**
     * @param array<mixed> $options
     */
    protected static function bootKernel(array $options = []): KernelInterface
    {
        static::ensureKernelTestCase();
        $kernel = parent::bootKernel($options);

        if ($kernel instanceof KernelInterface) {
            /** @var ManagerRegistry $managerRegistry */
            $managerRegistry = $kernel->getContainer()->get('doctrine');
            /** @var Connection $connection */
            $connection = $managerRegistry->getConnection(static::$connection);
            $connection->setNestTransactionsWithSavepoints(true);
            $connection->beginTransaction();
        }

        return $kernel;
    }

    protected static function ensureKernelShutdown(): void
    {
        if (null !== static::$kernel && self::$booted) {
            /** @var ManagerRegistry $managerRegistry */
            $managerRegistry = static::$kernel->getContainer()->get('doctrine');
            /** @var Connection $connection */
            $connection = $managerRegistry->getConnection(static::$connection);
            if ($connection->isTransactionActive()) {
                $connection->rollback();
            }
        }

        parent::ensureKernelShutdown();
    }
}
