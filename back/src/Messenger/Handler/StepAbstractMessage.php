<?php

declare(strict_types=1);

namespace App\Messenger\Handler;

use App\Entity\AbstractStep;
use App\Entity\Context;

class StepAbstractMessage extends AbstractMessage
{
    private ?AbstractStep $step;

    public function __construct(?AbstractStep $step, Context $context)
    {
        parent::__construct($context);
        $this->step = $step;
    }

    public function getStep(): ?AbstractStep
    {
        return $this->step;
    }

    public function setStep(AbstractStep $step): self
    {
        $this->step = $step;

        return $this;
    }
}
