<?php

declare(strict_types=1);

namespace App\Messenger\Handler\Sleep;

use App\Entity\Context;
use App\Entity\SleepStep;
use App\Messenger\Handler\StepAbstractMessage;

final class SleepMessage extends StepAbstractMessage
{
    public function __construct(SleepStep $step, Context $context)
    {
        parent::__construct($step, $context);
    }
}
