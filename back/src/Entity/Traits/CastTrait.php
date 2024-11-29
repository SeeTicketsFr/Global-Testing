<?php

namespace App\Entity\Traits;

trait CastTrait
{
    public function castToString(mixed $value): string
    {
        switch (\gettype($value)) {
            case 'NULL':
                return 'null';
            case 'boolean':
                return $value ? 'true' : 'false';
            case 'integer':
            case 'double':
            case 'string':
                return (string) $value;
            case 'array':
                $jsonString = json_encode($value);
                if (false === $jsonString) {
                    return '';
                }

                return $jsonString;
            default:
                return '';
        }
    }

    public function autoCast(mixed $value): mixed
    {
        if (is_numeric($value)) {
            return (int) $value;
        } elseif (\is_string($value)) {
            return match ($value) {
                'true', '1' => true,
                'false', '0' => false,
                default => $value,
            };
        }

        return $value;
    }
}
