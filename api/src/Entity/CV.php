<?php

namespace App\Entity;

use App\Repository\CVRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CVRepository::class)]
#[ORM\HasLifecycleCallbacks]
class CV
{
    use TimeStamps;


    #[Groups(["cv", 'public'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[Groups(["cv", 'public'])]
    #[ORM\Column(type: 'string', length: 256, nullable: true)]
    private string $description;

    /**
     * @var array|string[]
     */
    private array $extensions = ['pdf'];

    #[Groups(["cv", 'public'])]
    #[ORM\Column(type: 'integer', nullable: true)]
    private int $rating;

    #[Groups(["cv", 'public'])]
    #[ORM\ManyToOne(targetEntity: Company::class, inversedBy: 'cVs')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Company $company;

    #[Groups(["cv", 'public'])]
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'cVs')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user;

    #[Groups("cv_mediaObjects")]
    #[ORM\OneToMany(mappedBy: 'cv', targetEntity: MediaObject::class, orphanRemoval: true)]
    private  $mediaObjects;

    #[Pure] public function __construct()
    {
        $this->mediaObjects = new ArrayCollection();
    }

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
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * @param string|null $description
     * @return $this
     */
    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @param array $extensions
     * @return $this
     */
    public function setExtensions(array $extensions): self
    {
        $this->extensions = $extensions;
        return $this;
    }

    /**
     * @return array
     */
    public function getExtensions(): array
    {
        return $this->extensions;
    }

    /**
     * @return int|null
     */
    public function getRating(): ?int
    {
        return $this->rating;
    }

    /**
     * @param int|null $rating
     * @return $this
     */
    public function setRating(?int $rating): self
    {
        $this->rating = $rating;

        return $this;
    }

    /**
     * @return Company|null
     */
    public function getCompany(): ?Company
    {
        return $this->company;
    }

    /**
     * @param Company|null $company
     * @return $this
     */
    public function setCompany(?Company $company): self
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return User|null
     */
    public function getUser(): ?User
    {
        return $this->user;
    }

    /**
     * @param User|null $user
     * @return $this
     */
    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection
     */
    public function getMediaObjects(): Collection
    {
        return $this->mediaObjects;
    }

    /**
     * @param MediaObject $mediaObject
     * @return $this
     */
    public function addMediaObject(MediaObject $mediaObject): self
    {
        if (!$this->mediaObjects->contains($mediaObject)) {
            $this->mediaObjects[] = $mediaObject;
            $mediaObject->setCv($this);
        }

        return $this;
    }

    /**
     * @param MediaObject $mediaObject
     * @return $this
     */
    public function removeMediaObject(MediaObject $mediaObject): self
    {
        if ($this->mediaObjects->removeElement($mediaObject)) {
            if ($mediaObject->getCv() === $this) {
                $mediaObject->setCv(null);
            }
        }

        return $this;
    }
}
