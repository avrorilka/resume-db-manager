<?php


namespace App\Controller;

use App\Entity\Company;
use App\Entity\CV;
use App\Entity\MediaObject;
use App\Entity\User;
use App\Repository\CVRepository;
use App\Service\FileUploader;
use App\Service\Paginator;
use DateTimeZone;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Filesystem\Filesystem;
use PHPUnit\Util\Json;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Serializer\SerializerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Security;


#[Route('/api', name: 'cv')]
class CVController extends AbstractController
{

    /**
     * @param Filesystem $filesystem
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(Filesystem $filesystem, EntityManagerInterface $entityManager, SerializerInterface $serializer)
    {
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
        $this->fileSystem = $filesystem;
    }

    /**
     * @return JsonResponse
     */
    #[Route('/cv', name: 'get_all_cvs', methods: ['GET'])]
    public function getAllCVs(Request $request): JsonResponse
    {
        $page = $request->query->get('page');
        $itemsPerPage = $request->query->get('itemsPerPage');

        $filterQuery = $this->entityManager->getRepository(CV::class)->findBy([],['id'=>'DESC']);

        $paginator = new Paginator($filterQuery, $page, $itemsPerPage);
        $paginationResult = $paginator->getItems();

        $cvs = $paginationResult['items'];
        $totalPageCount = $paginationResult['totalPages'];
        if (!$cvs) {
            return new JsonResponse(["errors" => "CV not found"], Response::HTTP_NOT_FOUND);
        }
        return (new JsonResponse)->setContent($this->serializer->serialize([
            "list" => $cvs,
            "totalPageCount" => $totalPageCount,
            ], 'json', [
            'groups' => ['public', 'cv_mediaObjects'],
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                return $object->getId();
            }]));
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    #[Route('/cv/{id}', name: 'get_cv_by_id', methods: ['GET'])]
    public function getCVByID(int $id): JsonResponse
    {
        $cv = $this->entityManager->getRepository(CV::class)->find($id);
        if (!$cv) {
            return new JsonResponse(["errors" => "CV not found"], Response::HTTP_NOT_FOUND);
        }
        return (new JsonResponse())->setContent($this->serializer->serialize($cv, "json", [
            'groups' => ['public', 'cv_mediaObjects'],
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                return $object->getId();
            }
        ]));

    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    #[Route('/cv', name: 'create_cv', methods: ['POST'])]
    public function createCV(Request $request): JsonResponse
    {
        try {
            $cv = new CV();
            $this->serializer->deserialize($request->getContent(),
                CV::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $cv]);
            $data = json_decode($request->getContent(), true);
            $companyId = $data["company"];
            $userId = $data["user"];

            $company = $this->entityManager->getRepository(Company::class)->find($companyId);
            $user = $this->entityManager->getRepository(User::class)->find($userId);
            if (!$company) {
                throw new \Exception('Could\'t find a company');
            }
            $cv = new CV();

            $this->serializer->deserialize($request->getContent(),
                CV::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $cv]);

            $cv->setUser($user)
                ->setCompany($company);

            $this->entityManager->persist($cv);
            $this->entityManager->flush();

            return new JsonResponse(['success' => "cv added successfully", 'cvId' => $cv->getId()], Response::HTTP_CREATED);

        } catch (\Exception $e) {

            return new JsonResponse(['Error' => "An error occurred while creating the cv: " . $e], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    #[Route('/cv/{id}', name: 'update_cv', methods: ['PATCH'])]
    public function updateCV(Request $request, int $id): JsonResponse
    {
        try {
            $cv = $this->entityManager->getRepository(CV::class)->find($id);
            if (!$cv) {
                return new JsonResponse(['errors' => "CV not found"], Response::HTTP_NOT_FOUND);
            }

            $this->serializer->deserialize($request->getContent(),
                CV::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $cv]);

            $this->entityManager->flush();

            return new JsonResponse(['success' => "cv updated successfully", 'cvId' => $id], Response::HTTP_OK);

        } catch (\Exception $e) {
            return new JsonResponse(['Error' => "An error occurred while updating the cv: " . $e], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    #[Route('/cv/{id}', name: 'delete_cv', methods: ['DELETE'])]
    public function deleteCV(int $id): JsonResponse
    {
        try {

            $cv = $this->entityManager->getRepository(CV::class)->find($id);

            if (!$cv) {
                return new JsonResponse(['errors' => "CV not found"], Response::HTTP_NOT_FOUND);
            }
            $this->entityManager->remove($cv);
            $this->entityManager->flush();
            return new JsonResponse(['success' => 'CV was deleted successfully', 'cvId' => $id], Response::HTTP_OK);

        } catch (\Exception $e) {
            return new JsonResponse(['Error' => "An error occurred while updating the cv: " . $e], Response::HTTP_BAD_REQUEST);
        }
    }

}
