<?php

namespace App\Tests\Entity;

use App\Entity\SqsStep;
use Faker\Factory;
use Symfony\Component\Uid\Uuid;

/**
 * @covers \SqsStep
 */
class SqsStepTest extends AbstractTestEntity
{
    /**
     * @return array<int, array<mixed>>
     */
    public function valuesProvider(): array
    {
        $faker = Factory::create();

        return [
            [
                SqsStep::class,
                [
                    'id' => Uuid::v6(),
                    'name' => $faker->name(),
                    'stepNumber' => $faker->randomNumber(),
                    'variables' => [
                        $faker->word() => $faker->word(),
                    ],
                    'url' => $faker->url(),
                    'region' => $faker->word(),
                    'accessKey' => $faker->word(),
                    'secretKey' => $faker->word(),
                    'messageGroupId' => $faker->word(),
                    'content' => [
                        $faker->word() => $faker->word(),
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
