<?php

namespace App\Messenger\Traits\PropertyAccess;

use Symfony\Component\PropertyAccess\PropertyAccessor;

trait PropertyAccessTrait
{
    private PropertyAccessor $propertyAccess;

    public function setPropertyAccess(PropertyAccessor $propertyAccessor): void
    {
        $this->propertyAccess = $propertyAccessor;
    }

    public function getProperty(mixed $recipe, string $propertyPath): mixed
    {
        try {
            if (\is_array($recipe) || \is_object($recipe)) {
                return $this->propertyAccess->getValue($recipe, $propertyPath);
            }
        } catch (\Throwable $e) {
            dump("getProperty failed with propertyPath : $propertyPath and recipe : ");
        }

        return null;
    }

    public function setProperty(mixed $recipe, string $propertyPath, mixed $newValue): void
    {
        $this->propertyAccess->setValue($recipe, $propertyPath, $newValue);
    }
}
