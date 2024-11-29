<?php

namespace App\Tests\Entity;

use App\Entity\LoopStep;
use App\Entity\POPO\Condition;
use Faker\Factory;
use Symfony\Component\Uid\Uuid;

/**
 * @covers \LoopStep
 */
class LoopStepTest extends AbstractTestEntity
{
    /**
     * @return array<int, array<mixed>>
     */
    public function valuesProvider(): array
    {
        $faker = Factory::create();

        return [
            [
                LoopStep::class,
                [
                    'id' => Uuid::v6(),
                    'name' => $faker->name(),
                    'stepNumber' => $faker->randomNumber(),
                    'variables' => [
                        $faker->word() => $faker->word(),
                    ],
                    'runAfterFailure' => $faker->boolean(),
                    'stepToReturn' => $faker->randomNumber(1),
                    'conditions' => [
                        new Condition(),
                        new Condition(),
                    ],
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
