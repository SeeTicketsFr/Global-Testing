<?php

namespace App\Tests\Entity;

use App\Entity\Enum\HttpMethodsType;
use App\Entity\HttpStep;
use App\Entity\POPO\Treatment;
use Faker\Factory;
use Symfony\Component\Uid\Uuid;

/**
 * @covers \HttpStep
 */
class HttpStepTest extends AbstractTestEntity
{
    /**
     * @return array<int, array<mixed>>
     */
    public function valuesProvider(): array
    {
        $faker = Factory::create();

        $fakerRandomHttpMethodsType = $faker->randomElement(HttpMethodsType::values());

        return [
            [
                HttpStep::class,
                [
                    'id' => Uuid::v6(),
                    'name' => $faker->name(),
                    'stepNumber' => $faker->randomNumber(),
                    'variables' => [
                        $faker->word() => $faker->word(),
                    ],
                    'method' => (\is_int($fakerRandomHttpMethodsType) || \is_string($fakerRandomHttpMethodsType)) ? HttpMethodsType::from($fakerRandomHttpMethodsType) : HttpMethodsType::values()[0],
                    'url' => $faker->url(),
                    'content' => [
                        $faker->word() => $faker->word(),
                    ],
                    'headers' => [
                        $faker->word() => $faker->word(),
                    ],
                    'checkConditions' => [
                        $faker->word() => $faker->word(),
                    ],
                    'treatment' => [
                        new Treatment(),
                        new Treatment(),
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
