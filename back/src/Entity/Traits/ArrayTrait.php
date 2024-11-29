<?php

namespace App\Entity\Traits;

use App\Messenger\Traits\PropertyAccess\PropertyAccessTrait;

trait ArrayTrait
{
    use PropertyAccessTrait;

    /**
     * Return array respecting the provided criteria.
     *
     * @param array<mixed> $array    array of arrays
     * @param array<mixed> $criteria array containing the criteria ['key' => 'value']
     *
     * @return array<mixed>
     */
    public function filterArrayByKeyValueCriteria(array $array, array $criteria): array
    {
        return array_filter($array, function ($item) use ($criteria) {
            foreach ($criteria as $key => $value) {
                if ($this->getProperty($item, $key) !== $value) {
                    return false;
                }
            }

            return true;
        });
    }
}
