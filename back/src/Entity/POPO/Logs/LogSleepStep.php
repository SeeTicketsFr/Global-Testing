<?php

namespace App\Entity\POPO\Logs;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\Entity\SleepStep;
use App\Entity\Traits\Steps\SleepStepTrait;

#[ApiResource(
    operations: [
        new Get(
        ),
    ],
)]
class LogSleepStep extends LogAbstractStep
{
    use SleepStepTrait;

    public function createLog(SleepStep $step, ?string $error = null): self
    {
        $this->id = $step->getId();
        $this->name = $step->getName();
        $this->stepNumber = $step->getStepNumber();
        $this->variables = $step->getVariables();
        $this->runAfterFailure = $step->getRunAfterFailure();
        $this->duration = $step->getDuration();
        $this->error = $error;

        return $this;
    }
}
