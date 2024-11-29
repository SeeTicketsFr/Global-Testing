<?php

namespace App\Repository;

use App\Entity\ApiDocumentation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ApiDocumentation>
 *
 * @method ApiDocumentation|null find($id, $lockMode = null, $lockVersion = null)
 * @method ApiDocumentation|null findOneBy(array $criteria, array $orderBy = null)
 * @method ApiDocumentation[]    findAll()
 * @method ApiDocumentation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ApiDocumentationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ApiDocumentation::class);
    }
}
