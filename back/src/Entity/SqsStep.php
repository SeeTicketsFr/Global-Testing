<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Traits\Steps\SqsStepTrait;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: [
        'groups' => ['sqsstep:read', 'step:read'],
    ],
)]
class SqsStep extends AbstractStep
{
    use SqsStepTrait;
}
