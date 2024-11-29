<?php

namespace App\Entity\POPO;

use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[Assert\Cascade]
class Condition
{
    #[Groups(['loopstep:read'])]
    #[Assert\NotBlank()]
    private string $dynamicValue;

    #[Groups(['loopstep:read'])]
    private mixed $defaultValue = null;

    #[Groups(['loopstep:read'])]
    #[Assert\NotBlank()]
    private mixed $value = null;

    public function getDynamicValue(): ?string
    {
        return $this->dynamicValue;
    }

    public function setDynamicValue(string $dynamicValue): self
    {
        $this->dynamicValue = $dynamicValue;

        return $this;
    }

    public function getDefaultValue(): mixed
    {
        return $this->defaultValue;
    }

    public function setDefaultValue(mixed $defaultValue): self
    {
        $this->defaultValue = $defaultValue;

        return $this;
    }

    public function getValue(): mixed
    {
        return $this->value;
    }

    public function setValue(mixed $value): self
    {
        $this->value = $value;

        return $this;
    }
}
