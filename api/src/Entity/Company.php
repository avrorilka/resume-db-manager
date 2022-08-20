<?php

namespace App\Entity;

use App\Repository\CompanyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CompanyRepository::class)]
class Company
{
    #[Groups(["company", 'public'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[Groups(["company", 'public'])]
    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private string $name;

    #[Groups(["company", 'public'])]
    #[ORM\Column(type: 'text', nullable: true)]
    private string $description;

    #[Groups(["company", 'public'])]
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private string $address;

    #[Groups(["company", 'public'])]
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private string $website;

    #[Groups(["company", 'public'])]
    #[ORM\Column(type: 'string', length: 31, nullable: true)]
    private string $phone;

    #[Groups("company_cvs")]
    #[ORM\OneToMany(mappedBy: 'company', targetEntity: CV::class, orphanRemoval: true)]
    private array|Collection $cvs;

    #[Pure] public function __construct()
    {
        $this->cvs = new ArrayCollection();
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
     * @return string|null
     */
    public function getAddress(): ?string
    {
        return $this->address;
    }

    /**
     * @param string|null $address
     * @return $this
     */
    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getWebsite(): ?string
    {
        return $this->website;
    }

    /**
     * @param string|null $website
     * @return $this
     */
    public function setWebsite(?string $website): self
    {
        $this->website = $website;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getPhone(): ?string
    {
        return $this->phone;
    }

    /**
     * @param string|null $phone
     * @return $this
     */
    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * @return Collection|CV[]
     */
    public function getCVs(): Collection
    {
        return $this->cvs;
    }

    /**
     * @param CV $cv
     * @return $this
     */
    public function addCV(CV $cv): self
    {
        if (!$this->cvs->contains($cv)) {
            $this->cvs[] = $cv;
            $cv->setCompany($this);
        }

        return $this;
    }

    /**
     * @param CV $cv
     * @return $this
     */
    public function removeCV(CV $cv): self
    {
        if ($this->cvs->removeElement($cv)) {
            if ($cv->getCompany() === $this) {
                $cv->setCompany(null);
            }
        }

        return $this;
    }
}
