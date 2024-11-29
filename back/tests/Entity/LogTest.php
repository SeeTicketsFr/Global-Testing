<?php

namespace App\Tests\Entity;

use App\Entity\Log;
use App\Entity\POPO\Logs\LogHttpStep;
use Faker\Factory;
use Symfony\Component\Uid\Uuid;

/**
 * @covers \Log
 */
class LogTest extends AbstractTestEntity
{
    /**
     * @return array<int, array<mixed>>
     */
    public function valuesProvider(): array
    {
        $faker = Factory::create();

        return [
            [
                Log::class,
                [
                    'id' => Uuid::v6(),
                    'idExecution' => Uuid::v6(),
                    'idScenario' => Uuid::v6(),
                    'idStep' => Uuid::v6(),
                    'humanDescription' => $faker->name(),
                    'step' => new LogHttpStep(),
                    'createdAt' => $faker->dateTime(),
                ],
            ],
        ];
    }

    /**
     * @dataProvider valuesProvider
     *
     * @param array<mixed> $values
     */
    public function testGettersSetters(string $class, array $values): void
    {
        parent::_testGettersSetters($class, $values);
    }
}
