<?php

namespace App\Entity\Enum;

use App\Entity\Traits\EnumToArray;

enum HttpMethodsType: string
{
    use EnumToArray;

    case GET = 'GET';
    case POST = 'POST';
    case DELETE = 'DELETE';
    case PATCH = 'PATCH';
    case PUT = 'PUT';
    case HEAD = 'HEAD';
    case CONNECT = 'CONNECT';
    case OPTIONS = 'OPTIONS';
    case TRACE = 'TRACE';
}
