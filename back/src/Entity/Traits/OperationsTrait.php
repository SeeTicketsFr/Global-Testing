<?php

namespace App\Entity\Traits;

use App\Entity\Enum\MathOperationsType;

trait OperationsTrait
{
    public function mathOperations(string $operation, int $num1, int $num2): int|float
    {
        $operationType = MathOperationsType::tryFrom($operation);
        switch ($operationType) {
            case MathOperationsType::ADDITION:
                return $num1 + $num2;
            case MathOperationsType::SUBTRACT:
                return $num1 - $num2;
            case MathOperationsType::DIVIDE:
                if (0 === $num2) {
                    throw new \Exception('Division by zero is not allowed.');
                }

                return $num1 / $num2;
            case MathOperationsType::MULTIPLY:
                return $num1 * $num2;
            default:
                throw new \Exception('Invalid operation provided.');
        }
    }
}
