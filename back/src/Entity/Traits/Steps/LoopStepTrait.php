<?php

namespace App\Entity\Traits\Steps;

use App\Entity\POPO\Condition;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Dunglas\DoctrineJsonOdm\Type\JsonDocumentType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

trait LoopStepTrait
{
    /**
     * @var array<Condition>
     */
    #[ORM\Column(type: JsonDocumentType::NAME, nullable: true, options: ['jsonb' => true])]
    #[Groups(['loopstep:read'])]
    private ?array $conditions;

    #[ORM\Column(type: Types::INTEGER)]
    #[Groups(['loopstep:read'])]
    #[Assert\Positive()]
    private int $stepToReturn;

    public function getStepToReturn(): int
    {
        return $this->stepToReturn;
    }

    public function setStepToReturn(int $stepToReturn): self
    {
        $this->stepToReturn = $stepToReturn;

        return $this;
    }

    /**
     * @return array<Condition>
     */
    public function getConditions(): ?array
    {
        return $this->conditions;
    }

    public function addCondition(Condition $condition): static
    {
        $this->conditions[] = $condition;

        return $this;
    }

    /**
     * @param array<Condition> $conditions
     */
    public function setConditions(?array $conditions): self
    {
        $this->conditions = $conditions;

        return $this;
    }
}
