<?php

namespace App\Controller;

use App\Entity\Company;
use App\Entity\CV;
use App\Service\Paginator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api', name: 'company_api')]
class CompanyController extends AbstractController
{
    /**
     * @param EntityManagerInterface $entityManager
     * @param SerializerInterface $serializer
     */
    public function __construct(EntityManagerInterface $entityManager, SerializerInterface $serializer)
    {
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    #[Route('/companies', name: 'get_all_companies', methods: ['GET'])]
    public function getAllCompanies(Request $request,): JsonResponse
    {
        $page = $request->query->get('page');
        $itemsPerPage = $request->query->get('itemsPerPage');

        $allCompanies = $this->entityManager->getRepository(Company::class)->findBy([],['id'=>'DESC']);
        if ($page && $itemsPerPage)
        {
            $paginator = new Paginator($allCompanies, $page, $itemsPerPage);
            $paginationResult = $paginator->getItems();

            $companies = $paginationResult['items'];
            $totalPageCount = $paginationResult['totalPages'];
        }else{
            $companies = $allCompanies;
            $totalPageCount = null;
        }

        if (!$companies) {
            return new JsonResponse(['errors' => "Companies not found"], Response::HTTP_NOT_FOUND);
        }

        return (new JsonResponse())->setContent($this->serializer->serialize([
            "list" => $companies,
            "totalPageCount" => $totalPageCount,], 'json',
            [
                'groups' => ['public', 'cv_mediaObjects'],
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                }]));
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    #[Route('/companies/{id}', name: 'get_company_by_ID', methods: ['GET'])]
    public function getCompanyByID(int $id): JsonResponse
    {
        $company = $this->entityManager->getRepository(Company::class)->find($id);

        if (!$company) {
            return new JsonResponse(['errors' => "Company not found"], Response::HTTP_NOT_FOUND);
        }

        return (new JsonResponse())->setContent($this->serializer->serialize($company, 'json', [
            'groups' => ['public', 'company_cvs', 'cv_mediaObjects'],
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                return $object->getId();
            }]));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    #[Route('/companies', name: 'create_company', methods: ['POST'])]
    public function createCompany(Request $request): JsonResponse
    {
        try {
            $company = new Company();
            $this->serializer->deserialize($request->getContent(), Company::class,
                'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $company]);

            $this->entityManager->persist($company);
            $this->entityManager->flush();

            return new JsonResponse(['success' => "Company created successfully"], Response::HTTP_CREATED);

        } catch (\Exception) {
            return new JsonResponse(['errors' => "An error occurred while creating the company"], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    #[Route('/companies/{id}', name: 'update_company', methods: ['PATCH'])]
    public function updateCompany(Request $request, int $id): JsonResponse
    {
        try {
            $company = $this->entityManager->getRepository(Company::class)->find($id);

            if (!$company) {
                return new JsonResponse(['errors' => "Company not found"], Response::HTTP_NOT_FOUND);
            }

            $this->serializer->deserialize($request->getContent(), Company::class,
                'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $company]);

            $this->entityManager->flush();

            return new JsonResponse(['success' => "Company updated successfully"], Response::HTTP_OK);

        } catch (\Exception) {
            return new JsonResponse(['errors' => "An error occurred while updating the company"], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    #[Route('/companies/{id}', name: 'delete_company', methods: ['DELETE'])]
    public function deleteCompany(int $id): JsonResponse
    {
        try {
            $company = $this->entityManager->getRepository(Company::class)->find($id);

            if (!$company) {
                return new JsonResponse(['errors' => "Company not found"], Response::HTTP_NOT_FOUND);
            }

            $this->entityManager->remove($company);
            $this->entityManager->flush();

            return new JsonResponse(['success' => 'Company was deleted successfully'], Response::HTTP_OK);

        } catch (\Exception) {
            return new JsonResponse(['errors' => "An error occurred while deleting the company"], Response::HTTP_BAD_REQUEST);
        }
    }
}
