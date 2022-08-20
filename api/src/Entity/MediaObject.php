<?php

namespace App\Entity;

use App\Repository\MediaObjectRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MediaObjectRepository::class)]

class MediaObject
{

    #[Groups("public")]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private string $id;

    #[Groups("public")]
    #[ORM\Column(type: 'string', length: 255)]
    private string $name;

    #[Groups("public")]
    #[ORM\Column(type: 'string', length: 255)]
    private string $path;

    #[Groups("media_Cv")]
    #[ORM\ManyToOne(targetEntity: CV::class, inversedBy: 'mediaObjects')]
    #[ORM\JoinColumn(nullable: false)]
    private ?CV $cv;



    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string|null
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return $this
     */
    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getPath(): ?string
    {
        return $this->path;
    }

    /**
     * @param string $path
     * @return $this
     */
    public function setPath(string $path): self
    {
        $this->path = $path;

        return $this;
    }

    /**
     * @return CV|null
     */
    public function getCv(): ?CV
    {
        return $this->cv;
    }

    /**
     * @param CV|null $cv
     * @return $this
     */
    public function setCv(?CV $cv): self
    {
        $this->cv = $cv;

        return $this;
    }



}
