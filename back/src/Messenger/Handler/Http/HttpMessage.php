<?php

declare(strict_types=1);

namespace App\Messenger\Handler\Http;

use App\Entity\Context;
use App\Entity\HttpStep;
use App\Messenger\Handler\StepAbstractMessage;

final class HttpMessage extends StepAbstractMessage
{
    public function __construct(HttpStep $step, Context $context)
    {
        parent::__construct($step, $context);
    }
}
