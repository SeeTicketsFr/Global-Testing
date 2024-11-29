<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Traits\Steps\SleepStepTrait;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: [
        'groups' => ['sleepstep:read', 'step:read'],
    ],
)]
class SleepStep extends AbstractStep
{
    use SleepStepTrait;
}
