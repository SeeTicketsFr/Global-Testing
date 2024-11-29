<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Traits\Steps\HttpStepTrait;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: [
        'groups' => ['httpstep:read', 'step:read'],
    ],
)]
class HttpStep extends AbstractStep
{
    use HttpStepTrait;
}
