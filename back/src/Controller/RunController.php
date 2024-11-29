<?php

declare(strict_types=1);

namespace App\Controller;

use App\Messenger\Handler\Scenario\ScenarioMessage;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Uuid;

final class RunController extends AbstractController
{
    private MessageBusInterface $bus;

    public function __construct(MessageBusInterface $bus)
    {
        $this->bus = $bus;
    }

    #[Route('/api/scenario/{scenarioId}/run', name: 'run', methods: ['GET'])]
    public function run(Request $request): JsonResponse
    {
        $scenarioId = $request->get('scenarioId', null);
        $message = new ScenarioMessage(Uuid::fromString(\is_string($scenarioId) ? $scenarioId : ''), Uuid::v6());
        $this->bus->dispatch($message);

        return new JsonResponse(['scenarioId' => $scenarioId, 'executionId' => $message->getIdExecution()], Response::HTTP_CREATED);
    }
}
