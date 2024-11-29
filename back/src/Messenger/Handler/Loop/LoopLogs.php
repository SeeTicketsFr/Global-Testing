<?php

namespace App\Messenger\Handler\Loop;

enum LoopLogs: string
{
    case HANDLER_NAME = 'LoopHandler';
    case MISSING_PARAMETERS = 'Missing parameters (conditions or step to return)';
}
