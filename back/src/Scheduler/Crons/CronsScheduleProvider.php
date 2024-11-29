<?php

namespace App\Scheduler\Crons;

use App\Entity\Scenario;
use App\Entity\Traits\EntityManagerTrait;
use App\Messenger\Handler\Scenario\ScenarioMessage;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Messenger\Message\RedispatchMessage;
use Symfony\Component\Scheduler\Attribute\AsSchedule;
use Symfony\Component\Scheduler\RecurringMessage;
use Symfony\Component\Scheduler\Schedule;
use Symfony\Component\Scheduler\ScheduleProviderInterface;

/**
 * @codeCoverageIgnore
 */
#[AsSchedule('crons')]
class CronsScheduleProvider implements ScheduleProviderInterface
{
    use EntityManagerTrait;

    private Schedule $schedule;
    private LoggerInterface $logger;

    public function __construct(EntityManagerInterface $entityManager, LoggerInterface $logger)
    {
        $this->schedule = new Schedule();
        $this->logger = $logger;

        $this->setEntityManager($entityManager);
    }

    public function getSchedule(): Schedule
    {
        $this->logger->info('Initializing schedule.');

        $this->logger->info('Scheduler is enabled.');

        $all = $this->getEntityManager()->getRepository(Scenario::class)->findAll();

        foreach ($all as $task) {
            $cron = $task->getCron();
            if (!empty($cron)) {
                $this->schedule->add(RecurringMessage::cron($cron, new RedispatchMessage(new ScenarioMessage($task->getId()), 'async')));
            }
        }

        $this->logger->info('Schedule initialized with tasks.', ['tasks' => $all]);

        return $this->schedule;
    }

    public function setSchedule(Schedule $schedule): void
    {
        $this->schedule = $schedule;
    }

    public function clear(): void
    {
        $this->schedule->clear();
    }
}
