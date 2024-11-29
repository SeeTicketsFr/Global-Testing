<?php

namespace App\Entity\Enum;

enum MathOperationsType: string
{
    case ADDITION = '+';
    case SUBTRACT = '-';
    case DIVIDE = '/';
    case MULTIPLY = '*';
}
