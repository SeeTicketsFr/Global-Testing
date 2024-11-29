<?php

namespace App\Messenger\Enum;

enum Logs
{
    case BEGIN_SCENARIO;
    case BEGIN_STEP;

    case NEXT_STEP_FOUND;
    case NEXT_STEP_NOT_FOUND;
    case NEXT_STEP_MESSAGE_SENT;

    case END_STEP;

    case ERROR_SCENARIO;
    case ERROR_STEP;
    case INFORMATION_STEP;
    case STEP_NOT_FOUND;
    case NO_STEP_NUMBER;
    case NO_STEP_IN_CONTEXT;
    case CONTEXT_NOT_FOUND;

    /**
     * @param array<string,string> $params
     */
    public function getLog(array $params = []): string
    {
        $name = $params['name'] ?? '';
        $handler = $params['handler'] ?? '';
        $message = $params['message'] ?? '';

        return match ($this) {
            Logs::BEGIN_SCENARIO => "[INFO] The Scenario {$name} in handler {$handler} has begun.",
            Logs::BEGIN_STEP => "[INFO] The step {$name} in handler {$handler} has begun.",

            Logs::NEXT_STEP_FOUND => 'Next step found !',
            Logs::NEXT_STEP_NOT_FOUND => 'Next step not found !',
            Logs::NEXT_STEP_MESSAGE_SENT => "[INFO] Step {$name} in handler {$handler} : Next step message sent :)",

            Logs::END_STEP => "[INFO] The step {$name} in handler {$handler} has ended.",

            Logs::ERROR_SCENARIO => "[ERROR] An error occurred in scenario {$name} in handler {$handler}: {$message}",
            Logs::ERROR_STEP => "[ERROR] An error occurred in step {$name} in handler {$handler}: {$message}",
            Logs::CONTEXT_NOT_FOUND => '[ERROR] Context not found',

            Logs::INFORMATION_STEP => "[INFO] Step {$name} in handler {$handler}: {$message}",
            Logs::STEP_NOT_FOUND => 'Step not found',
            Logs::NO_STEP_IN_CONTEXT => 'The step is not in the context',
            Logs::NO_STEP_NUMBER => 'Current step does not have step number',
        };
    }
}
