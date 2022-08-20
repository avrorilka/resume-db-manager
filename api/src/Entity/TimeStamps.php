<?php

namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

trait TimeStamps
{
    #[Groups(["cv", 'public'])]
    #[ORM\Column(type: 'integer')]
    private int $createdAt;

    #[Groups(["cv", 'public'])]
    #[ORM\Column(type: 'integer')]
    private int $updatedAt;

    /**
     * @return void
     */
    #[ORM\PrePersist]
    public function createdAt()
    {
        $this->createdAt = time();
        $this->updatedAt = time();
    }

    /**
     * @return void
     */
    #[ORM\PreUpdate]
    public function updatedAt()
    {
        $this->updatedAt = time();
    }

    /**
     * @param $createdAt
     * @return $this
     */
    public function setCreatedAt($createdAt) : self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return int
     */
    public function getCreatedAt() : int
    {
        return $this->createdAt;
    }

    /**
     * @param $updatedAt
     * @return $this
     */
    public function setUpdatedAt($updatedAt) : self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @return int
     */
    public function getUpdatedAt() : int
    {
        return $this->updatedAt;
    }

}