<?php

namespace App\Messenger\Traits\Http;

use App\Entity\POPO\HttpResponse;
use App\Entity\POPO\Treatment;
use App\Entity\Traits\ArrayTrait;
use App\Entity\Traits\CastTrait;
use App\Exception\CheckFailed;
use App\Messenger\Traits\PropertyAccess\PropertyAccessTrait;

trait SendHttpRequestTrait
{
    use ArrayTrait;
    use CastTrait;
    use HttpRequestTrait;
    use PropertyAccessTrait;

    /**
     * @param array<mixed> $content
     * @param array<mixed> $headers
     *
     * @return array<mixed>
     */
    private function createOptions(?array $headers, ?array $content): array
    {
        $options = [];

        // Authorization
        if (null !== $headers && \count($headers) > 0) {
            if (\array_key_exists('Authorization', $headers)) {
                $authorizationHeader = $headers['Authorization'];
                if (null !== $authorizationHeader && str_contains($authorizationHeader, 'BEARER') && str_contains($authorizationHeader, '=')) {
                    preg_match('/([^;]+)/', $authorizationHeader, $matches);
                    if (isset($matches[0])) {
                        $headers['Authorization'] = str_replace('=', ' ', $matches[0]);
                    }
                }
            }
            $options['headers'] = $headers;
        }

        if (!empty($content)) {
            $options['json'] = $content;
        }

        return $options;
    }

    /**
     * @param array<mixed>     $content
     * @param array<Treatment> $treatments
     */
    private function treatment(HttpResponse $response, array $content, array $treatments): HttpResponse
    {
        foreach ($treatments as $treatment) {
            $treatmentLocation = $treatment->getContentLocation();
            $content = $this->getProperty($response->getContent(), \is_string($treatmentLocation) ? $treatmentLocation : '');
            $variableName = $this->castToString($treatment->getVariableName());

            if (\is_array($content) && \is_string($variableName)) {
                $conditions = $treatment->getConditions();
                if (null !== $conditions && \is_array($conditions)) {
                    $filteredArray = array_values($this->filterArrayByKeyValueCriteria($content, (array) $conditions));
                    $response->addContent($variableName, $filteredArray);
                }
            }
        }

        return $response;
    }

    /**
     * @param array<mixed> $conditions
     */
    private function check(HttpResponse $response, array $conditions): bool
    {
        foreach ($conditions as $conditionKey => $conditionValue) {
            $propertyValue = $this->getProperty($response, $conditionKey);

            $conditionKey = $this->castToString($conditionKey);
            $conditionValue = $this->castToString($conditionValue);
            $propertyValue = $this->castToString($propertyValue);

            if ($propertyValue !== $conditionValue) {
                throw new CheckFailed("Check Condition - $conditionKey : $conditionValue = $propertyValue is not valid");
            }
        }

        return true;
    }
}
