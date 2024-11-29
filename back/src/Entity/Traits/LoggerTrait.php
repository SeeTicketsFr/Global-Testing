<?php

namespace App\Entity\Traits;

use App\Entity\AbstractStep;
use App\Entity\ContextHttpStep;
use App\Entity\ContextSqsStep;
use App\Entity\Log;
use App\Entity\LoopStep;
use App\Entity\POPO\Logs\LogAbstractStep;
use App\Entity\POPO\Logs\LogHttpStep;
use App\Entity\POPO\Logs\LogLoopStep;
use App\Entity\POPO\Logs\LogSleepStep;
use App\Entity\POPO\Logs\LogSqsStep;
use App\Entity\SleepStep;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Uid\Uuid;

trait LoggerTrait
{
    private EntityManagerInterface $entityManager;

    public function log(Uuid $idScenario, Uuid $idExecution, string $humanDescription, ?Uuid $idStep, ?AbstractStep $step, ?string $error = null): void
    {
        $log = (new Log())
            ->setIdExecution($idExecution)
            ->setIdScenario($idScenario)
            ->setHumanDescription($humanDescription)
            ->setCreatedAt(new \DateTime());

        if (null !== $idStep) {
            $log->setIdStep($idStep);
        }

        if (null !== $step) {
            $logStep = $this->createStepLog($step, $error);
            if (null !== $logStep) {
                $log->setStep($logStep);
            }
        }

        $this->entityManager->persist($log);
        $this->entityManager->flush();
    }

    public function createStepLog(AbstractStep $step, ?string $error = null): ?LogAbstractStep
    {
        if ($step instanceof ContextHttpStep) {
            $logStep = new LogHttpStep();
        } elseif ($step instanceof LoopStep) {
            $logStep = new LogLoopStep();
        } elseif ($step instanceof SleepStep) {
            $logStep = new LogSleepStep();
        } elseif ($step instanceof ContextSqsStep) {
            $logStep = new LogSqsStep();
        } else {
            return null;
        }

        $logStep->createLog($step, $error);

        return $logStep;
    }
}
