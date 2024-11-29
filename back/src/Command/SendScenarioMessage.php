<?php

namespace App\Command;

use App\Messenger\Handler\Scenario\ScenarioMessage;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Uid\Uuid;

#[AsCommand(
    name: 'message:scenario',
    description: 'Send a scenario message to the RabbitMQ Queue.',
    hidden: false,
    aliases: ['message:scenario']
)]
class SendScenarioMessage extends Command
{
    private MessageBusInterface $bus;

    public function __construct(MessageBusInterface $bus)
    {
        parent::__construct();
        $this->bus = $bus;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $output->writeln([
            'Send Scenario Message to the RabbitMQ Queue',
            '============',
            '',
        ]);

        $message = new ScenarioMessage(Uuid::fromString('016b1d91-a8df-6a09-90c2-56d8e6ef1fb6')); // Default scenario id : '016b1d91-a8df-6a09-90c2-56d8e6ef1fb6'
        $this->bus->dispatch($message);

        $output->writeln('Scenario Message sent to the RabbitMQ Queue !');

        return Command::SUCCESS;
    }
}
