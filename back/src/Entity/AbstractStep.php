<?php

namespace App\Entity;

use App\Entity\Traits\Steps\AbstractStepTrait;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\InheritanceType('JOINED')]
#[ORM\DiscriminatorMap(['http' => HttpStep::class, 'loop' => LoopStep::class, 'sleep' => SleepStep::class, 'sqs' => SqsStep::class])]
abstract class AbstractStep
{
    use AbstractStepTrait;

    #[Assert\NotBlank]
    #[ORM\ManyToOne(targetEntity: Scenario::class, inversedBy: 'steps')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    protected ?Scenario $scenario;

    public function getScenario(): ?Scenario
    {
        return $this->scenario;
    }

    public function setScenario(?Scenario $scenario): self
    {
        $this->scenario = $scenario;

        return $this;
    }
}
