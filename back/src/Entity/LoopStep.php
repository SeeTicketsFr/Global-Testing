<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Traits\Steps\LoopStepTrait;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: [
        'groups' => ['loopstep:read', 'step:read'],
    ],
)]
class LoopStep extends AbstractStep
{
    use LoopStepTrait;
}
