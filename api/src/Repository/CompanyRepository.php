<?php

namespace App\Repository;

use App\Entity\Company;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Doctrine\ORM\Query;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Company|null find($id, $lockMode = null, $lockVersion = null)
 * @method Company|null findOneBy(array $criteria, array $orderBy = null)
 * @method Company[]    findAll()
 * @method Company[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CompanyRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Company::class);
    }


//    /**
//     * @throws NonUniqueResultException
//     * @throws NoResultException
//     */
//    public function getAmount()
//    {
//        return $this->createQueryBuilder('c')
//            ->select('count(c.id)')
//            ->getQuery()
//            ->getSingleResult();
//    }
//
//    /**
//     * @param array $filterData
//     * @return Query
//     */
//    public function getFilterQuery(array $filterData): Query
//    {
//        return $this->createQueryBuilder('c')
//            ->orderBy('c.id', 'DESC')
//            ->getQuery();
//    }
//
//    public function findByExampleField($value)
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }


    /*
    public function findOneBySomeField($value): ?Company
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
