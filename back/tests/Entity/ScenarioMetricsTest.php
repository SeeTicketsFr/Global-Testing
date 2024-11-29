<?php

namespace App\Tests\Entity;

use App\Entity\Scenario;
use App\Entity\ScenarioMetrics;
use Faker\Factory;
use Symfony\Component\Uid\Uuid;

/**
 * @covers \ScenarioMetrics
 */
class ScenarioMetricsTest extends AbstractTestEntity
{
    /**
     * @return array<int, array<mixed>>
     */
    public function valuesProvider(): array
    {
        $faker = Factory::create();

        return [
            [
                ScenarioMetrics::class,
                [
                    'id' => Uuid::v6(),
                    'scenario' => new Scenario(),
                    'totalExecutions' => $faker->randomNumber(),
                    'successExecutions' => $faker->randomNumber(),
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
