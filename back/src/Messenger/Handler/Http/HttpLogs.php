<?php

namespace App\Messenger\Handler\Http;

enum HttpLogs: string
{
    case HANDLER_NAME = 'HttpHandler';
    case ERROR_PROCESS_HTTP = 'Error while processing HTTP request';
    case ERROR_SENDING_HTTP_REQUEST = 'Error while sending HTTP request';
    case NO_TREATMENT_PROVIDED = 'No treatment provided';
    case TREATMENT_PROVIDED = 'Treatment provided';
    case CHECK_FAILED = 'The check conditions failed';
    case NO_CHECK_PROVIDED = 'No check provided';
    case CHECK_PROVIDED = 'Check provided';
}
