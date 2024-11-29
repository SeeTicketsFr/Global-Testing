<?php

namespace App\Messenger\Handler;

use App\Entity\Context;
use App\Entity\ContextHttpStep;
use App\Entity\ContextSqsStep;
use App\Entity\HttpStep;
use App\Entity\Scenario;
use App\Entity\SqsStep;
use Symfony\Component\Uid\Uuid;

abstract class AbstractMessage
{
    private ?Context $context;

    public function __construct(?Context $context = null)
    {
        $this->context = $context;
    }

    public function createContext(Uuid $idExecution, Scenario $scenario): Context
    {
        if (null === $this->context) {
            $this->setContext(new Context($scenario, $idExecution));
        }
        if (null !== $this->context && null !== $this->context->getScenario()) {
            $scenario = $this->context->getScenario();
            foreach ($scenario->getSteps() as $step) {
                if ($step instanceof HttpStep) {
                    $step = (new ContextHttpStep())->createContext($step);
                } elseif ($step instanceof SqsStep) {
                    $step = (new ContextSqsStep())->createContext($step);
                }
                $this->context->addStep($step);
            }
        }

        if (null === $this->context) {
            throw new \RuntimeException('Context not initialized');
        }

        return $this->context;
    }

    public function getContext(): ?Context
    {
        return $this->context;
    }

    public function setContext(Context $context): self
    {
        $this->context = $context;

        return $this;
    }
}
