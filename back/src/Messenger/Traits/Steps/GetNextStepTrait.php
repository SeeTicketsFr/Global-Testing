<?php

namespace App\Messenger\Traits\Steps;

use App\Entity\AbstractStep;
use App\Entity\Context;
use App\Entity\HttpStep;
use App\Entity\LoopStep;
use App\Entity\SleepStep;
use App\Entity\SqsStep;
use App\Messenger\Handler\AbstractMessage;
use App\Messenger\Handler\Http\HttpMessage;
use App\Messenger\Handler\Loop\LoopMessage;
use App\Messenger\Handler\Sleep\SleepMessage;
use App\Messenger\Handler\Sqs\SqsMessage;
use Doctrine\Common\Collections\Collection;

trait GetNextStepTrait
{
    /**
     * @param Collection<int, AbstractStep> $abstractSteps
     */
    public function getStepBasedOnStepNumber(int $stepNumber, Collection $abstractSteps): ?AbstractStep
    {
        $nextStep = null;
        foreach ($abstractSteps as $step) {
            if ($step->getStepNumber() === $stepNumber) {
                return $step;
            }
        }

        return $nextStep;
    }

    public function getNextStepMessageBasedOnType(AbstractStep $nextStep, Context $context): ?AbstractMessage
    {
        if ($nextStep instanceof HttpStep) {
            return new HttpMessage($nextStep, $context);
        } elseif ($nextStep instanceof LoopStep) {
            return new LoopMessage($nextStep, $context);
        } elseif ($nextStep instanceof SleepStep) {
            return new SleepMessage($nextStep, $context);
        } elseif ($nextStep instanceof SqsStep) {
            return new SqsMessage($nextStep, $context);
        }

        return null;
    }

    public function getNextStep(Context $context, int $stepNumber): ?AbstractMessage
    {
        $nextStep = $this->getStepBasedOnStepNumber($stepNumber, $context->getSteps());
        if (null === $nextStep) {
            return null;
        }

        return $this->getNextStepMessageBasedOnType($nextStep, $context);
    }

    public function getNextStepBasedOnFailure(Context $context, int $stepNumber): ?AbstractMessage
    {
        $abstractSteps = $context->getSteps();
        foreach ($abstractSteps as $step) {
            if (true === $step->getRunAfterFailure() && $stepNumber < $step->getStepNumber()) {
                return $this->getNextStepMessageBasedOnType($step, $context);
            }
        }

        return null;
    }
}
