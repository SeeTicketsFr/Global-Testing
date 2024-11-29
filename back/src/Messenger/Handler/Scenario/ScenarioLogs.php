<?php

namespace App\Messenger\Handler\Scenario;

enum ScenarioLogs: string
{
    case HANDLER_NAME = 'ScenarioHandler';
    case SCENARIO_NOT_FOUND = 'Scenario not found';
    case SCENARIO_HAS_NO_STEP = 'The scenario has no step';
}
