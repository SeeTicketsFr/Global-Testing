<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\Pagination\ArrayPaginator;
use ApiPlatform\State\Pagination\PartialPaginatorInterface;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Webhook;
use App\Repository\WebhookRepository;
use Symfony\Component\HttpFoundation\Request;

/**
 * @implements ProviderInterface<Webhook>
 */
class WebhookProvider implements ProviderInterface
{
    public function __construct(
        private readonly WebhookRepository $webhookRepository,
    ) {
    }

    /**
     * @param array<string> $uriVariables
     * @param array<mixed>  $context
     *
     * @return ArrayPaginator<Webhook>
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): PartialPaginatorInterface
    {
        $idScenario = $uriVariables['idScenario'];
        $webhooks = $this->webhookRepository->getWebhooksByScenarioId($idScenario) ?? [];

        /** @var Request $request */
        $request = $context['request'];
        $page = (int) ($request->query->get('page') ?? 1);
        $limit = (int) ($request->query->get('limit') ?? 10);

        $firstResult = ($page - 1) * $limit;
        $maxResults = $limit;

        return new ArrayPaginator(\is_array($webhooks) ? $webhooks : [], $firstResult, $maxResults);
    }
}
