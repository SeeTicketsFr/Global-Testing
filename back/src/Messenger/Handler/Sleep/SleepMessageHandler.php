<?php

declare(strict_types=1);

namespace App\Messenger\Handler\Sleep;

use App\Entity\SleepStep;
use App\Entity\Traits\EntityManagerTrait;
use App\Entity\Traits\LoggerTrait;
use App\Messenger\Enum\Logs;
use App\Messenger\Handler\AbstractMessageHandler;
use App\Messenger\Traits\Handler\HandlerTrait;
use App\Messenger\Traits\PropertyAccess\PropertyAccessTrait;
use App\Messenger\Traits\Steps\GetNextStepTrait;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Component\Messenger\Envelope;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Messenger\Stamp\DelayStamp;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[AsMessageHandler]
final class SleepMessageHandler extends AbstractMessageHandler
{
    use EntityManagerTrait;
    use GetNextStepTrait;
    use HandlerTrait;
    use LoggerTrait;
    use PropertyAccessTrait;

    public function __construct(MessageBusInterface $bus, EntityManagerInterface $entityManager, HttpClientInterface $client)
    {
        parent::__construct($bus);
        $this->setPropertyAccess(PropertyAccess::createPropertyAccessor());
        $this->setEntityManager($entityManager);
        $this->setHandlerName(SleepLogs::HANDLER_NAME->value);
        $this->setClient($client);
    }

    public function __invoke(SleepMessage $message): void
    {
        $context = $message->getContext();
        if (null === $context) {
            throw new \Exception(Logs::CONTEXT_NOT_FOUND->getLog());
        }

        $idScenario = $context->getScenario()->getId();
        $idExecution = $context->getIdExecution();
        $this->setIdExecution($idExecution);

        try {
            $step = $message->getStep();
            if (null === $step || !($step instanceof SleepStep)) {
                throw new \Exception(Logs::STEP_NOT_FOUND->getLog());
            }

            $this->setStepName($step->getName());
            $this->beginStep($idScenario, $idExecution, $step);

            $nextStepMessage = $this->getNextStep($context, $step->getStepNumber() + 1);
            $envelope = null;
            if (null !== $nextStepMessage) {
                $envelope = new Envelope($nextStepMessage, [
                    new DelayStamp($step->getDuration()),
                ]);
            }
        } catch (\Exception $e) {
            $this->handleError($context, $step ?? null, $e);
        } finally {
            $envelope ??= null;
            $step ??= null;
            $this->endStep($context, $idScenario, $idExecution, $step, null, $this->getError() ?? null, $envelope);
        }
    }
}
