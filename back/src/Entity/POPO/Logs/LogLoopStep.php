<?php

namespace App\Entity\POPO\Logs;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\Entity\LoopStep;
use App\Entity\Traits\Steps\LoopStepTrait;

#[ApiResource(
    operations: [
        new Get(
        ),
    ],
)]
class LogLoopStep extends LogAbstractStep
{
    use LoopStepTrait;

    public function createLog(LoopStep $step, ?string $error = null): self
    {
        $this->id = $step->getId();
        $this->name = $step->getName();
        $this->stepNumber = $step->getStepNumber();
        $this->variables = $step->getVariables();
        $this->runAfterFailure = $step->getRunAfterFailure();
        $this->conditions = $step->getConditions();
        $this->stepToReturn = $step->getStepToReturn();
        $this->error = $error;

        return $this;
    }
}
