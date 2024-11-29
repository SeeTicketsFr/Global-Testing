<?php

namespace App\Messenger\Traits\Handler;

use App\Entity\AbstractStep;
use App\Entity\Context;
use App\Messenger\Enum\Logs;
use App\Messenger\Handler\AbstractMessage;
use App\Messenger\Traits\Metrics\MetricsTrait;
use Symfony\Component\Messenger\Envelope;
use Symfony\Component\Uid\Uuid;

trait HandlerTrait
{
    use MetricsTrait;

    private string $handlerName = '';
    private Uuid $idExecution;
    private string $stepName = '';
    private ?string $error = null;

    public function getHandlerName(): string
    {
        return $this->handlerName;
    }

    public function setHandlerName(string $handlerName): self
    {
        $this->handlerName = $handlerName;

        return $this;
    }

    public function getIdExecution(): Uuid
    {
        return $this->idExecution;
    }

    public function setIdExecution(Uuid $idExecution): self
    {
        $this->idExecution = $idExecution;

        return $this;
    }

    public function getStepName(): string
    {
        return $this->stepName;
    }

    public function setStepName(string $stepName): self
    {
        $this->stepName = $stepName;

        return $this;
    }

    public function getError(): ?string
    {
        return $this->error;
    }

    public function setError(?string $error): self
    {
        $this->error = $error;

        return $this;
    }

    private function logBeginStep(Uuid $idScenario, Uuid $idExecution, AbstractStep $step): void
    {
        $this->log(
            $idScenario,
            $idExecution,
            Logs::BEGIN_STEP->getLog(['name' => $step->getName(), 'handler' => $this->handlerName]),
            $step->getId(),
            null
        );
    }

    private function handleError(Context $context, ?AbstractStep $step, \Exception $e): void
    {
        $this->setError($e->getMessage());
        $this->handleFailure($context, $step, $e->getMessage(), $this->handlerName);
    }

    private function handleFailure(Context $context, ?AbstractStep $step, string $errorMessage, string $handlerName): void
    {
        $idExecution = $this->getIdExecution();
        $this->log($context->getScenario()->getId(), $idExecution, Logs::ERROR_STEP->getLog(['name' => $this->getStepName(), 'handler' => $handlerName, 'message' => $errorMessage]), null !== $step ? $step->getId() : Uuid::v6(), null, null);
        if (null === $step) {
            return;
        }
        $nextStepMessage = $this->getNextStepBasedOnFailure($context, $step->getStepNumber());
        $this->handleMessage($context, $nextStepMessage);
    }

    private function handleMessage(Context $context, Envelope|AbstractMessage|null $nextStepMessage): void
    {
        if (null === $nextStepMessage) {
            $this->updateScenarioMetrics($context->getScenario(), $this->idExecution);

            return;
        }
        $this->sendMessage($nextStepMessage);
    }
}
