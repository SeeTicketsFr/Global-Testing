<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Uid\Uuid;

class Context
{
    private Uuid $idExecution;

    private Scenario $scenario;

    /**
     * @var Collection<int, AbstractStep>|AbstractStep[]
     */
    private Collection $steps;

    public function __construct(Scenario $scenario, Uuid $idExecution)
    {
        $this->idExecution = $idExecution;
        $this->scenario = $scenario;
        $this->steps = new ArrayCollection();
    }

    public function getIdExecution(): Uuid
    {
        return $this->idExecution;
    }

    public function setIdExecution(Uuid $idExecution): self
    {
        $this->idExecution = $idExecution;

        return $this;
    }

    public function getScenario(): Scenario
    {
        return $this->scenario;
    }

    public function setScenario(Scenario $scenario): self
    {
        $this->scenario = $scenario;

        return $this;
    }

    /**
     * @return Collection<int, AbstractStep>
     */
    public function getSteps(): Collection
    {
        return $this->steps;
    }

    /**
     * @param Collection<int, AbstractStep> $steps
     */
    public function setSteps(Collection $steps): self
    {
        $this->steps = $steps;

        return $this;
    }

    public function addStep(AbstractStep $step): self
    {
        if (!$this->steps->contains($step)) {
            $this->steps->add($step);
            $step->setScenario($this->getScenario());
        }

        return $this;
    }

    public function removeStep(AbstractStep $step): self
    {
        if ($this->steps->removeElement($step) && $step->getScenario() === $this->getScenario()) {
            $step->setScenario(null);
        }

        return $this;
    }
}
