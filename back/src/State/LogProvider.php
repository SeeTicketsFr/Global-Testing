<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\Pagination\ArrayPaginator;
use ApiPlatform\State\Pagination\PartialPaginatorInterface;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Log;
use App\Repository\LogRepository;
use Symfony\Component\HttpFoundation\Request;

/**
 * @implements ProviderInterface<Log>
 */
class LogProvider implements ProviderInterface
{
    public function __construct(
        private readonly LogRepository $logRepository,
    ) {
    }

    /**
     * @param array<string> $uriVariables
     * @param array<mixed>  $context
     *
     * @return ArrayPaginator<Log>
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): PartialPaginatorInterface
    {
        $idScenario = $uriVariables['idScenario'];
        $logs = $this->logRepository->getLogsByScenarioId($idScenario) ?? [];

        /** @var Request $request */
        $request = $context['request'];
        $page = (int) ($request->query->get('page') ?? 1);
        $limit = (int) ($request->query->get('limit') ?? 10);

        $firstResult = ($page - 1) * $limit;
        $maxResults = $limit;

        return new ArrayPaginator(\is_array($logs) ? $logs : [], $firstResult, $maxResults);
    }
}
