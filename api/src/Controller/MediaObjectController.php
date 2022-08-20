<?php

namespace App\Controller;

use App\Entity\CV;
use App\Entity\MediaObject;
use App\Service\FileUploader;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\HeaderUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api', name: 'MediaObject')]
class MediaObjectController extends AbstractController
{
    /**
     * @param Filesystem $filesystem
     * @param EntityManagerInterface $entityManager
     * @param SerializerInterface $serializer
     */
    public function __construct(Filesystem $filesystem, EntityManagerInterface $entityManager, SerializerInterface $serializer)
    {
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
        $this->fileSystem = $filesystem;
    }

    /**
     * @param int $id
     * @return Response
     */
    #[Route('/media-object/{id}/file', name: 'get_file_by_id', methods: ['GET'])]
    public function getFileById(int $id): Response
    {
        $mediaObject = $this->entityManager->getRepository(MediaObject::class)->find($id);


        if (!$mediaObject) {
            return new JsonResponse(["errors" => "File not found"], Response::HTTP_NOT_FOUND);
        }
        return new BinaryFileResponse($this->getParameter('uploads.dir') . 'cv/' . $mediaObject->getName());
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    #[Route('/media-object/{id}', name: 'get_mediaObject_by_id', methods: ['GET'])]
    public function getMediaObjectById(int $id): JsonResponse
    {
        $mediaObject = $this->entityManager->getRepository(MediaObject::class)->find($id);

        if (!$mediaObject) {
            return new JsonResponse(["errors" => "File not found"], Response::HTTP_NOT_FOUND);
        }

        return (new JsonResponse())->setContent($this->serializer->serialize($mediaObject, "json"));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    #[Route('/media-object', name: 'create_media_object', methods: ['POST'])]
    public function createMediaObject(Request $request): JsonResponse
    {
        try {
            $mediaObject = new MediaObject();

            $cvId = $request->request->get('cvId');

            $cv = $this->entityManager->getRepository(CV::class)->find($cvId);
            if (!$cv) {
                return new JsonResponse(['Error' => "Couldn't find a cv"], Response::HTTP_BAD_REQUEST);
            }
            $file = $request->files->get('file');
            if (!$file) {
                return new JsonResponse(['Error' => "Couldn't find a file"], Response::HTTP_BAD_REQUEST);
            }

            $fileUploader = new FileUploader(($this->getParameter('uploads.dir')) . 'cv/');
            $filename = $fileUploader->upload($file, ['extensions' => $cv->getExtensions(), 'sizeMb' => 2]);

            $mediaObject->setName($filename)
                ->setPath('cv/')
                ->setCv($cv);

            $this->entityManager->persist($mediaObject);
            $this->entityManager->flush();

            return new JsonResponse(['success' => "file added successfully"], Response::HTTP_CREATED);

        } catch (Exception $e) {

            return new JsonResponse(['Error' => "An error occurred while uploading the file: " . $e], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    #[Route('/media-object/{id}', name: 'update_media_object', methods: ['POST'])]
    public function updateMediaObject(int $id, Request $request): JsonResponse
    {
        try {
            $mediaObject = $this->entityManager->getRepository(MediaObject::class)->find($id);


            $cv = $mediaObject->getCv();
            if (!$cv) {
                return new JsonResponse(['Error' => "Couldn't find a cv"], Response::HTTP_BAD_REQUEST);
            }
            $file = $request->files->get('file');
            if (!$file) {
                return new JsonResponse(['success' => 'File wasn\'t changed'], Response::HTTP_OK);
            }

            $fileUploader = new FileUploader(($this->getParameter('uploads.dir')) . 'cv/');
            $fileUploader->delete($mediaObject->getName());
            $filename = $fileUploader->upload($file, ['extensions' => $cv->getExtensions(), 'sizeMb' => 2]);

            $mediaObject->setName($filename)
                ->setPath('cv/')
                ->setCv($cv);

            $this->entityManager->persist($mediaObject);
            $this->entityManager->flush();

            return new JsonResponse(['success' => "file updated successfully"], Response::HTTP_OK);

        } catch (Exception $e) {

            return new JsonResponse(['Error' => "An error occurred while uploading the file: " . $e], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    #[Route('/media-object/{id}', name: 'delete_mediaObject', methods: ['DELETE'])]
    public function deleteMediaObject(int $id): JsonResponse
    {
        try {
            $mediaObject = $this->entityManager->getRepository(MediaObject::class)->find($id);
            if (!$mediaObject) {
                return new JsonResponse(['errors' => "File not found"], Response::HTTP_NOT_FOUND);
            }
            $fileUploader = new FileUploader(($this->getParameter('uploads.dir')) . $mediaObject->getPath());;

            $deleteResult = $fileUploader->delete($mediaObject->getName());
            if (!$deleteResult) {
                throw new Exception("Error while deleting the file");
            }
            return new JsonResponse(['success' => 'File was deleted successfully'], Response::HTTP_OK);

        } catch (Exception $e) {
            return new JsonResponse(['Error' => "File error occurred while updating the cv: " . $e], Response::HTTP_BAD_REQUEST);
        }
    }
}
