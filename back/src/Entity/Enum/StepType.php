<?php

namespace App\Entity\Enum;

enum StepType: string
{
    case SimpleHttp = 'SimpleHttp';
    case Loop = 'Loop';
    case Sleep = 'Sleep';
}
