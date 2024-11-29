<?php

declare(strict_types=1);

namespace App\Messenger\Handler\Loop;

use App\Entity\Context;
use App\Entity\LoopStep;
use App\Messenger\Handler\StepAbstractMessage;

final class LoopMessage extends StepAbstractMessage
{
    public function __construct(LoopStep $step, Context $context)
    {
        parent::__construct($step, $context);
    }
}
