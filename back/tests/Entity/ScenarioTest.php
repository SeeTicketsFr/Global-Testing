<?php

namespace App\Tests\Entity;

use App\Entity\HttpStep;
use App\Entity\Scenario;
use App\Entity\ScenarioMetrics;
use Faker\Factory;
use Symfony\Component\Uid\Uuid;

/**
 * @covers \Scenario
 */
class ScenarioTest extends AbstractTestEntity
{
    /**
     * @return array<int, array<mixed>>
     */
    public function valuesProvider(): array
    {
        $faker = Factory::create();

        return [
            [
                Scenario::class,
                [
                    'id' => Uuid::v6(),
                    'name' => $faker->name(),
                    'variables' => [
                        $faker->word() => $faker->word(),
                    ],
                    'cron' => '* * * * *',
                    'metrics' => new ScenarioMetrics(),
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
        /* @var Scenario $entity */
        $entity = parent::_testGettersSetters($class, $values);

        parent::testAddRemoveGetXXX($entity, subClassList: ['step' => HttpStep::class]);
    }
}
