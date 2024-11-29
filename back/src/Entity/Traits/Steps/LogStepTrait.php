<?php

namespace App\Entity\Traits\Steps;

use Symfony\Component\Serializer\Annotation\Groups;

trait LogStepTrait
{
    #[Groups(['log:read'])]
    protected ?string $error;

    public function getError(): ?string
    {
        return $this->error;
    }

    public function setError(?string $error): self
    {
        $this->error = $error;

        return $this;
    }
}
