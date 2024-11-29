<?php

namespace App\Entity\Traits\Steps;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

trait SleepStepTrait
{
    #[ORM\Column(type: Types::INTEGER)]
    #[Groups(['sleepstep:read'])]
    #[Assert\Positive()]
    private int $duration;

    public function getDuration(): int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): self
    {
        $this->duration = $duration;

        return $this;
    }
}
