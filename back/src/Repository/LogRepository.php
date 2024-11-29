<?php

namespace App\Repository;

use App\Entity\Log;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Log>
 *
 * @method Log|null find($id, $lockMode = null, $lockVersion = null)
 * @method Log|null findOneBy(array $criteria, array $orderBy = null)
 * @method Log[]    findAll()
 * @method Log[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LogRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Log::class);
    }

    public function getLogsByScenarioId(string $idScenario): mixed
    {
        $qb = $this->createQueryBuilder('log');

        $qb->select('log.id, log.idExecution, log.idScenario, log.humanDescription, log.step, log.createdAt')
           ->where($qb->expr()->in(
               'log.createdAt',
               $this->createQueryBuilder('subLog')
                   ->select('MIN(subLog2.createdAt)')
                   ->from(Log::class, 'subLog2')
                   ->where('subLog2.idExecution = log.idExecution')
                   ->andWhere('subLog2.idScenario = :idScenario')
                   ->setParameter('idScenario', $idScenario)
                   ->getDQL())
           )
           ->andWhere('log.idScenario = :idScenario')
           ->setParameter('idScenario', $idScenario);

        return $qb->getQuery()->getResult();
    }
}
