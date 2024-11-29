<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\ApiDocumentation;
use cebe\openapi\Reader;
use cebe\openapi\ReferenceContext;
use cebe\openapi\spec\OpenApi;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @implements ProviderInterface<ApiDocumentation>
 */
class ApiDocumentationProvider implements ProviderInterface
{
    /**
     * @param \ApiPlatform\State\ProviderInterface<ApiDocumentation> $itemProvider
     */
    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.item_provider')]
        private readonly ProviderInterface $itemProvider,
    ) {
    }

    /**
     * @param array<string> $uriVariables
     * @param array<mixed>  $context
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): ?JsonResponse
    {
        /** @var ApiDocumentation|null $apiDocumentation */
        $apiDocumentation = $this->itemProvider->provide($operation, $uriVariables, $context);
        if (null === $apiDocumentation) {
            return null;
        }
        $url = $apiDocumentation->getUrl();

        $fileType = pathinfo($url, \PATHINFO_EXTENSION);

        // Get json file and resolve references ($ref)
        $mode = ReferenceContext::RESOLVE_MODE_ALL;

        if (str_starts_with($fileType, 'json')) {
            $openapi = Reader::readFromJsonFile($url, OpenApi::class, $mode);
        } elseif ('yaml' === $fileType || 'yml' === $fileType) {
            $openapi = Reader::readFromYamlFile($url, OpenApi::class, $mode);
        } else {
            return new JsonResponse(['error' => 'Unsupported file type'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $json = \cebe\openapi\Writer::writeToJson($openapi);

        return new JsonResponse(json_decode($json));
    }
}
