<?php

namespace App\Tests\Entity;

use App\Entity\ApiDocumentation;
use Faker\Factory;
use Symfony\Component\Uid\Uuid;

/**
 * @covers \ApiDocumentation
 */
class ApiDocumentationTest extends AbstractTestEntity
{
    /**
     * @return array<int, array<mixed>>
     */
    public function valuesProvider(): array
    {
        $faker = Factory::create();

        return [
            [
                ApiDocumentation::class,
                [
                    'id' => Uuid::v6(),
                    'name' => $faker->name(),
                    'url' => $faker->url(),
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
