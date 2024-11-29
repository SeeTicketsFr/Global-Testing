<?php

namespace App\Messenger\Traits\Data;

use Faker\Factory;
use Faker\Generator;

trait FakerTrait
{
    private Generator $faker;

    public function __construct(Generator $faker)
    {
        $this->faker = $faker;
    }

    public function setFaker(Generator $faker): void
    {
        $this->faker = $faker;
    }

    public function initializeFaker(): void
    {
        $this->faker = Factory::create();
    }
}
