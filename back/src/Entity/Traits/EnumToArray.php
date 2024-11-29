<?php

namespace App\Entity\Traits;

/**
 * @codeCoverageIgnore
 */
trait EnumToArray
{
    /** @return array<string> */
    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    /** @return array<mixed> */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /** @return array<string, mixed> */
    public static function array(): array
    {
        return array_combine(self::names(), self::values());
    }
}
