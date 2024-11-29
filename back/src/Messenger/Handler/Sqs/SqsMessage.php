<?php

declare(strict_types=1);

namespace App\Messenger\Handler\Sqs;

use App\Entity\Context;
use App\Entity\SqsStep;
use App\Messenger\Handler\StepAbstractMessage;

final class SqsMessage extends StepAbstractMessage
{
    public function __construct(SqsStep $step, Context $context)
    {
        parent::__construct($step, $context);
    }
}
