<?php

namespace App\Messenger\Traits\Metrics;

use App\Entity\Log;
use App\Entity\Scenario;
use App\Entity\ScenarioMetrics;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Uid\Uuid;

trait MetricsTrait
{
    private EntityManagerInterface $entityManager;

    private function updateScenarioMetrics(Scenario $scenario, Uuid $idExecution): void
    {
        if (!$this->entityManager->contains($scenario)) {
            $scenario = $this->entityManager->getRepository(className: Scenario::class)->findOneBy(['id' => $scenario->getId()]);
        }
        if (null === $scenario) {
            return;
        }
        $metrics = $scenario->getMetrics();
        if (null === $metrics) {
            $metrics = new ScenarioMetrics();
            $metrics->setTotalExecutions(1);
        } else {
            $metrics->setTotalExecutions($metrics->getTotalExecutions() + 1);
        }
        $metrics->setScenario($scenario);

        if ($this->isExecutionSuccessful($idExecution)) {
            $metrics->setSuccessExecutions($metrics->getSuccessExecutions() + 1);
        }

        try {
            $this->entityManager->persist($metrics);
            $this->entityManager->flush();
        } catch (\Throwable $e) {
            throw $e;
        }
    }

    private function isExecutionSuccessful(Uuid $idExecution): bool
    {
        try {
            $logs = $this->entityManager->getRepository(Log::class)->findBy(['idExecution' => $idExecution]);
        } catch (\Throwable $e) {
            throw $e;
        }
        foreach ($logs as $log) {
            $step = $log->getStep();
            if (null !== $step && null !== $step->getError()) {
                return false;
            }
        }

        return true;
    }
}
