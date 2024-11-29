<?php

namespace App\Tests\Entity;

use App\Entity\SleepStep;
use Faker\Factory;
use Symfony\Component\Uid\Uuid;

/**
 * @covers \SleepStep
 */
class SleepStepTest extends AbstractTestEntity
{
    /**
     * @return array<int, array<mixed>>
     */
    public function valuesProvider(): array
    {
        $faker = Factory::create();

        return [
            [
                SleepStep::class,
                [
                    'id' => Uuid::v6(),
                    'name' => $faker->name(),
                    'stepNumber' => $faker->randomNumber(),
                    'variables' => [
                        $faker->word() => $faker->word(),
                    ],
                    'duration' => $faker->randomNumber(),
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
