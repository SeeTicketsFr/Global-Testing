<?php

namespace App\Command;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Application;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

/**
 * @codeCoverageIgnore
 */
#[AsCommand(name: 'app:tests:load-fixtures')]
class TestsLoadFixturesCommand extends Command
{
    public function __construct(private readonly EntityManagerInterface $entityManager, private readonly string $environment)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        if ('test' !== $this->environment) {
            $io->error('Not in test env.');

            return Command::FAILURE;
        }

        $application = $this->getApplication();

        if (!$application instanceof Application) {
            return Command::FAILURE;
        }

        $io->writeln('Disabling doctrine listeners...');
        $eventManager = $this->entityManager->getEventManager();
        foreach ($eventManager->getAllListeners() as $event => $listeners) {
            foreach ($listeners as $listener) {
                $eventManager->removeEventListener($event, $listener);
            }
        }

        $sqlDir = \sprintf('%s/../../tests/Resources/sql', __DIR__);

        $io->writeln('Executing before_fixtures.sql...');
        $beforeFixtures = file_get_contents(\sprintf('%s/before_fixtures.sql', $sqlDir));
        if (false === $beforeFixtures) {
            return Command::FAILURE;
        }
        if ('' !== $beforeFixtures) {
            $this->entityManager->getConnection()->executeStatement($beforeFixtures);
        }

        $io->writeln('Executing hautelook:fixtures:load...');
        $command = $application->find('hautelook:fixtures:load');
        $input = new ArrayInput([]);
        $input->setInteractive(false);
        $returnCode = $command->run($input, $output);

        if (0 !== $returnCode) {
            $io->error('hautelook:fixtures:load did not finish well.');

            return Command::FAILURE;
        }

        $io->writeln('Executing after_fixtures.sql...');
        $afterFixtures = file_get_contents(\sprintf('%s/after_fixtures.sql', $sqlDir));
        if (false === $afterFixtures) {
            return Command::FAILURE;
        }
        if ('' !== $afterFixtures) {
            $this->entityManager->getConnection()->executeStatement($afterFixtures);
        }

        $application->reset();

        $io->success('Fixtures loaded successfully.');

        return Command::SUCCESS;
    }
}
