<?php

namespace App\Service;

use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;


class FileUploader
{

    /**
     * @var string
     */
    private string $targetDirectory;

    /**
     * @var Filesystem
     */
    private Filesystem $filesystem;

    /**
     * @param $targetDirectory
     */
    public function __construct($targetDirectory)
    {
        $this->targetDirectory = $targetDirectory;
        $this->filesystem = new Filesystem();
    }

    /**
     * @param UploadedFile $file
     * @param $rules
     * @return string|null
     */
    public function upload(UploadedFile $file, $rules): ?string
    {
        $errors = $this->validateFile($file, $rules);
        if (count($errors) > 0){
            throw new FileException(join("\n", $errors));
        }
        $fileName = uniqid().'.'.$file->guessExtension();
        try {
            $file->move($this->targetDirectory, $fileName);
        }catch (FileException $e)
        {
            return new FileException($e);
        }
        return $fileName;
    }

    /**
     * @param string $fileName
     * @return bool
     */
    public function delete(string $fileName) : bool
    {
        if ($this->filesystem->exists($this->targetDirectory.$fileName))
        {

            $this->filesystem->remove($this->targetDirectory.$fileName);
            return true;
        }
        return false;
    }

    /**
     * @param string $fileName
     * @return UploadedFile|void
     */
    public function getFile(string $fileName) : ?UploadedFile
    {
        if ($this->filesystem->exists($this->targetDirectory.$fileName))
        {
          return new UploadedFile($this->targetDirectory.$fileName, $fileName);
        }
    }

    /**
     * @param UploadedFile $file
     * @return array
     */
    private function validateFile(UploadedFile $file, array $rules): array
    {
        $errors = [];
        if (array_search($file->guessExtension(), $rules['extensions']))
        {
            $errors []= "Error: wrong file format";
        }
        if($file->getSize() > 1000000 * $rules['sizeMb']) // multiple to Mb (now 2 Mb)
        {
            $errors []= "Error: file is too big";
        }
        return $errors;
    }

}