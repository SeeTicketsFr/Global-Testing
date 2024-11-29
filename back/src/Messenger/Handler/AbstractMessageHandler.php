<?php

declare(strict_types=1);

namespace App\Messenger\Handler;

use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Component\Messenger\Envelope;
use Symfony\Component\Messenger\MessageBusInterface;

#[AsMessageHandler]
abstract class AbstractMessageHandler
{
    private MessageBusInterface $bus;

    public function __construct(MessageBusInterface $bus)
    {
        $this->bus = $bus;
    }

    public function sendMessage(AbstractMessage|Envelope $message): void
    {
        $this->getBus()->dispatch($message);
    }

    public function getBus(): MessageBusInterface
    {
        return $this->bus;
    }

    public function setBus(MessageBusInterface $bus): self
    {
        $this->bus = $bus;

        return $this;
    }
}
