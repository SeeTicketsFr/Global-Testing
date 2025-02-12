<?php

namespace App\Entity\Enum;

enum WebhookEventType: string
{
    case ON_FAILURE = 'onFailure';
    case ON_SUCCESS = 'onSuccess';
}
