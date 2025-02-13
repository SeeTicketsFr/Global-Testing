<?php

declare(strict_types=1);

namespace App\Messenger\Handler\DataRetention\Logs;

use App\Entity\Traits\EntityManagerTrait;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
final class DeleteLogsMessageHandler
{
    use EntityManagerTrait;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->setEntityManager($entityManager);
    }

    public function __invoke(DeleteLogsMessage $message): void
    {
        $qb = $this->entityManager->createQueryBuilder();

        $qb->delete('App\Entity\Log', 'l')
            ->where('l.createdAt < :dateLimit')
            ->setParameter('dateLimit', new \DateTime('-7 days')) // TODO: data retention settings on UI
            ->getQuery()
            ->execute();
    }
}
