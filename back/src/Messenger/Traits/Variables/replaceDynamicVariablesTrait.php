<?php

namespace App\Messenger\Traits\Variables;

use App\Entity\Context;
use App\Entity\Enum\MathOperationsType;
use App\Entity\Traits\CastTrait;
use App\Entity\Traits\OperationsTrait;
use App\Messenger\Traits\Data\FakerTrait;
use App\Messenger\Traits\PropertyAccess\PropertyAccessTrait;

trait replaceDynamicVariablesTrait
{
    use CastTrait;
    use FakerTrait;
    use OperationsTrait;
    use PropertyAccessTrait;

    /**
     * @param array<mixed> $array
     *
     * @return array<mixed>
     */
    private function replaceVariablesInArray(Context $context, array $array): array
    {
        array_walk_recursive($array, fn (&$value) => $value = \is_string($value) ? $this->replaceVariablesInString($context, $value) : $value);   // only replace if its a string (Ex: "{dynamic...}"=

        return $array;
    }

    private function getValueForReplace(Context $context, string $variablePath): mixed
    {
        return $this->getProperty($context, $variablePath);
    }

    private function replaceVariablesInString(Context $context, string $str): mixed
    {
        $iterationCount = 0;
        $maxIterations = 5;

        while ($iterationCount < $maxIterations && preg_match('/<<((v|r|f|now).*?)>>/', $str)) {
            preg_match_all('/<<((v|r|f|now).*?)>>/', $str, $matches, \PREG_SET_ORDER);

            foreach ($matches as $match) {
                $variableReplaced = false;
                $variablesInfo = $this->extractVariablesInfo($match[1]);

                foreach ($variablesInfo as $variableInfo) {
                    $output = $this->getOutputForVariable($variableInfo);

                    if (!empty($output)) {
                        if ('f' !== $variableInfo[1] && 'now' !== $variableInfo[1]) {
                            $replaceValue = $this->getValueForReplace($context, $output);
                        } else {
                            $replaceValue = $output;
                        }

                        if (null !== $replaceValue) {
                            $replaceValue = \is_array($replaceValue) ? implode('', $replaceValue) : $this->castToString($replaceValue);
                            $str = str_replace($match[0], $replaceValue, $str);
                            $variableReplaced = true;
                            break;
                        }
                    }
                }

                if (!$variableReplaced) {
                    $str = $this->replaceWithDefaultValue($match[0], $str);
                }
            }

            ++$iterationCount;
        }

        return $this->verifyNumericValueAction($str);
    }

    /**
     * @return array<array<string>>
     */
    private function extractVariablesInfo(string $variableString): array
    {
        preg_match_all("/(v|r|f|now):(steps\[\d+\]|scenario|)(:|)([^ ]+|'[^']+'|.*)/", $variableString, $variablesInfo, \PREG_SET_ORDER);

        return $variablesInfo;
    }

    /**
     * @param array<string> $parts
     */
    private function getOutputForVariable(array $parts): string
    {
        switch ($parts[1]) {
            case 'v':
                return $this->getVariableOutput($parts);
            case 'r':
                return $this->getResponseOutput($parts);
            case 'f':
                return $this->getFakerOutput($parts);
            case 'now':
                return $this->getCurrentDateTime($parts);
            default:
                return '';
        }
    }

    /**
     * @param array<string> $parts
     */
    private function getCurrentDateTime(array $parts): string
    {
        $timeZone = 'UTC';
        $format = 'Y-m-d\TH:i:s.v\Z';

        if ('default' !== $parts[4]) {
            $options = explode(',', $parts[4]);

            if (!empty($options[0])) {
                $timeZone = $options[0];
            }

            if (!empty($options[1])) {
                $format = $options[1];
            }
        }

        try {
            $now = new \DateTime('now', new \DateTimeZone($timeZone));
        } catch (\Exception $e) {
            throw new \InvalidArgumentException("Le fuseau horaire spécifié '$timeZone' est invalide.");
        }

        return $now->format($format);
    }

    /**
     * @param array<string> $parts
     */
    private function getVariableOutput(array $parts): string
    {
        $variableName = $parts[4];

        if (preg_match('/steps\[(\d+)\]/', $parts[2], $stepMatch)) {
            $stepNumber = (int) $stepMatch[1] - 1;

            return "steps[$stepNumber].variables[$variableName]";
        }

        return "scenario.variables[$variableName]";
    }

    /**
     * @param array<string> $parts
     */
    private function getResponseOutput(array $parts): string
    {
        if (preg_match('/steps\[(\d+)\]/', $parts[2], $stepMatch)) {
            $stepNumber = (int) $stepMatch[1] - 1;
            $variableName = $parts[4];

            return "steps[$stepNumber].response.$variableName";
        }

        return '';
    }

    /**
     * @param array<string> $parts
     */
    private function getFakerOutput(array $parts): string
    {
        $fakerMethod = $parts[4];

        if (\is_callable([$this->faker, $fakerMethod])) {
            return $this->faker->$fakerMethod();
        }
        throw new \InvalidArgumentException("The faker method '$fakerMethod' doesn't exist.");
    }

    private function replaceWithDefaultValue(string $match, string $str): string
    {
        if (preg_match("/'[^']+'/", $match, $defaultValue)) {
            return str_replace($match, $this->castToString(trim($defaultValue[0], "'")), $str);
        }

        return str_replace($match, '', $str);
    }

    private function verifyNumericValueAction(string $str): mixed
    {
        $regex = '/<<o:(\\'.MathOperationsType::ADDITION->value.'|'.MathOperationsType::SUBTRACT->value.'|\\'.MathOperationsType::MULTIPLY->value.'|\\'.MathOperationsType::DIVIDE->value.'):(-?\d+):(-?\d+)>>/';
        preg_match_all($regex, $str, $matches, \PREG_SET_ORDER);
        while (\count($matches) > 0) {
            foreach ($matches as $match) {
                $operation = $match[1];
                $num1 = (int) $match[2];
                $num2 = (int) $match[3];
                $str = str_replace($match[0], (string) $this->mathOperations($operation, $num1, $num2), $str);
            }
            preg_match_all($regex, $str, $matches, \PREG_SET_ORDER);
        }

        return $str;
    }
}
