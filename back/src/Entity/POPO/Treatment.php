<?php

namespace App\Entity\POPO;

use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[Assert\Cascade]
class Treatment
{
    #[Groups(['httpstep:read'])]
    #[Assert\NotBlank()]
    private string $variableName;

    #[Groups(['httpstep:read'])]
    #[Assert\NotBlank()]
    private string $contentLocation;

    /** @var array<string, string> */
    #[Groups(['httpstep:read'])]
    #[Assert\NotBlank()]
    private array $conditions;

    public function getVariableName(): ?string
    {
        return $this->variableName;
    }

    public function setVariableName(string $variableName): self
    {
        $this->variableName = $variableName;

        return $this;
    }

    public function getContentLocation(): ?string
    {
        return $this->contentLocation;
    }

    public function setContentLocation(string $contentLocation): self
    {
        $this->contentLocation = $contentLocation;

        return $this;
    }

    /**
     * @return array<string, string>
     */
    public function getConditions(): ?array
    {
        return $this->conditions;
    }

    public function addConditions(string $key, string $value): void
    {
        $this->conditions[$key] = $value;
    }

    /**
     * @param array<string, string> $conditions
     */
    public function setConditions(array $conditions): self
    {
        $this->conditions = $conditions;

        return $this;
    }
}
