<?php

namespace App\Scheduler\DataRetention;

use App\Messenger\Handler\DataRetention\Logs\DeleteLogsMessage;
use Psr\Log\LoggerInterface;
use Symfony\Component\Messenger\Message\RedispatchMessage;
use Symfony\Component\Scheduler\Attribute\AsSchedule;
use Symfony\Component\Scheduler\RecurringMessage;
use Symfony\Component\Scheduler\Schedule;
use Symfony\Component\Scheduler\ScheduleProviderInterface;

/**
 * @codeCoverageIgnore
 */
#[AsSchedule('dataretention')]
class DataRetentionScheduleProvider implements ScheduleProviderInterface
{

    private Schedule $schedule;
    private LoggerInterface $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->schedule = new Schedule();
        $this->logger = $logger;
    }

    public function getSchedule(): Schedule
    {
        $this->logger->info('Initializing data retention schedule.');
        $this->schedule->add(RecurringMessage::cron("0 0 * * *", new RedispatchMessage(new DeleteLogsMessage(), 'async')));
        return $this->schedule;
    }

    public function clear(): void
    {
        $this->schedule->clear();
    }
}
