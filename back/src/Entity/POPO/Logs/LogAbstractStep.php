<?php

namespace App\Entity\POPO\Logs;

use App\Entity\Traits\Steps\AbstractStepTrait;
use App\Entity\Traits\Steps\LogStepTrait;

abstract class LogAbstractStep
{
    use AbstractStepTrait;
    use LogStepTrait;
}
