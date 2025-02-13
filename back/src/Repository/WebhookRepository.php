<?php

namespace App\Repository;

use App\Entity\Webhook;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Webhook>
 *
 * @method Log|null find($id, $lockMode = null, $lockVersion = null)
 * @method Log|null findOneBy(array $criteria, array $orderBy = null)
 * @method Log[]    findAll()
 * @method Log[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WebhookRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Webhook::class);
    }

    public function getWebhooksByScenarioId(string $idScenario): mixed
    {
        $qb = $this->createQueryBuilder('webhook');

        $qb->select('webhook.id, webhook.eventType, webhook.url')
           ->where('webhook.scenario = :idScenario')
           ->setParameter('idScenario', $idScenario);

        return $qb->getQuery()->getResult();
    }
}
