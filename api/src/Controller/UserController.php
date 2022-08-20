<?php

namespace App\Controller;

use App\Entity\Company;
use App\Entity\CV;
use App\Entity\User;
use App\Service\Paginator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;


#[Route('/api', name: 'user_api')]
class UserController extends AbstractController
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
     * @return JsonResponse
     */
    #[Route('/users', name: 'get_all_users', methods: ['GET'])]
    public function getAllUsers(Request $request): JsonResponse
    {
        $page = $request->query->get('page');
        $itemsPerPage = $request->query->get('itemsPerPage');

        $filterQuery = $this->entityManager->getRepository(User::class)->findBy(['active'=>1], ['id'=>'DESC']);

        $paginator = new Paginator($filterQuery, $page, $itemsPerPage);
        $paginationResult = $paginator->getItems();

        $users = $paginationResult['items'];
        $totalPageCount = $paginationResult['totalPages'];

        if (!$users) {
            return new JsonResponse(['errors' => "Users not found"], Response::HTTP_NOT_FOUND);
        }

        return (new JsonResponse())->setContent($this->serializer->serialize(
            [
                "list" => $users,
                "totalPageCount" => $totalPageCount,],
            'json',
            [
            'groups' => ['public', 'user_cvs', 'cv_mediaObjects'],
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                return $object->getId();
            }]));
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    #[Route('/users/{id}', name: 'get_user_by_ID', methods: ['GET'])]
    public function getUserByID(int $id): JsonResponse
    {

        $user = $this->entityManager -> getRepository(User::class) -> findBy(array('id' => $id, 'active' => true))[0];

        if (!$user) {
            return new JsonResponse(['errors' => "User not found"], Response::HTTP_NOT_FOUND);
        }

        return (new JsonResponse())->setContent($this->serializer->serialize($user, 'json', [
            'groups' => ['public', 'user_cvs', 'cv_mediaObjects'],
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                return $object->getId();
            }]));
    }

    /**
     * @return JsonResponse
     */
    #[Route('/profile', name: 'get_user_by_token', methods: ['GET'])]
    public function getCurrentUser(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse(['errors' => "User not found"], Response::HTTP_NOT_FOUND);
        }

        return (new JsonResponse())->setContent($this->serializer->serialize($user, 'json', [
            'groups' => ['public', 'user_cvs', 'cv_mediaObjects'],
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                return $object->getId();
            }]));
    }

    /**
     * @param Request $request
     * @param UserPasswordHasherInterface $passwordHasher
     * @return JsonResponse
     */
    #[Route('/registration', name: 'user_registration', methods: ['POST'])]
    public function registration(Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        try {
            $user = new User();
            $this->serializer->deserialize($request->getContent(), User::class,
                'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $user]);

            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                $user->getPassword()
            );
            $user->setPassword($hashedPassword);
            $user->setRoles(['ROLE_USER']);
            $user->setActive(true);

            $this->entityManager->persist($user);
            $this->entityManager->flush();

            return new JsonResponse(['success' => "User added successfully"], Response::HTTP_CREATED);

        } catch (\Exception) {
            return new JsonResponse(['errors' => "An error occurred while creating the user"], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @param Request $request
     * @param UserPasswordHasherInterface $passwordHasher
     * @param int $id
     * @return JsonResponse
     */
    #[Route('/users/{id}', name: 'update_user', methods: ['PATCH'])]
    public function updateUser(Request $request, UserPasswordHasherInterface $passwordHasher, int $id)
    {
        try {
            $parameters = json_decode($request->getContent(), true);
            $user = $this->entityManager->getRepository(User::class)->find($id);

            if (!$user) {
                return new JsonResponse(['errors' => "User not found"], Response::HTTP_NOT_FOUND);
            }

            isset($parameters['email']) ? throw new \Exception("Mail update forbidden") : null;

            $this->serializer->deserialize($request->getContent(), User::class,
                'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $user]);

            if (isset($parameters['password'])) {
                $hashedPassword = $passwordHasher->hashPassword(
                    $user,
                    $parameters['password']
                );
                $user->setPassword($hashedPassword);
            }

            $this->entityManager->flush();

            return new JsonResponse(['success' => "User updated successfully"], Response::HTTP_OK);

        } catch (\Exception) {
            return new JsonResponse(['errors' => "An error occurred while creating the user"], Response::HTTP_BAD_REQUEST);
        }
    }


    /**
     * @param int $id
     * @return JsonResponse
     */
    #[Route('/users/{id}', name: 'delete_user', methods: ['DELETE'])]
    public function deleteUser(int $id): JsonResponse
    {
        try {
            $user = $this->entityManager->getRepository(User::class)->find($id);

            if (!$user) {
                return new JsonResponse(['errors' => "User not found"], Response::HTTP_NOT_FOUND);
            }

            $user->setActive(false);
            $this->entityManager->flush();

            return new JsonResponse(['success' => 'User was deleted successfully'], Response::HTTP_OK);

        } catch (\Exception) {
            return new JsonResponse(['errors' => "An error occurred while creating the user"], Response::HTTP_BAD_REQUEST);
        }
    }


}
