<?php

namespace App\Entity\Traits;

use Doctrine\ORM\EntityManagerInterface;

trait EntityManagerTrait
{
    private EntityManagerInterface $entityManager;

    public function getEntityManager(): EntityManagerInterface
    {
        return $this->entityManager;
    }

    public function setEntityManager(EntityManagerInterface $entityManager): void
    {
        $this->entityManager = $entityManager;
    }
}
