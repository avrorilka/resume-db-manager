<?php

namespace App\Service;

use Doctrine\DBAL\Query;
use Doctrine\ORM\QueryBuilder;
use JetBrains\PhpStorm\ArrayShape;

class Paginator
{

    /**
     * @var array
     */
    private array $allItems;

    /**
     * @var int
     */
    private int $page;

    /**
     * @var int
     */
    private int $itemsPerPage;

    /**
     * @var int
     */
    private int $totalItems;

    /**
     * @var array
     */
    private array $items;

    /**
     * @var int|null
     */
    private ?int $maxPages;

    /**
     * @param array $allItems
     * @param int $page
     * @param int $itemsPerPage
     */
    public function __construct(array $allItems, int $page=1, int $itemsPerPage=2)
    {
        $this->allItems = $allItems;
        $this->page = $page;
        $this->itemsPerPage = $itemsPerPage;
        $this->totalItems = count($allItems);
        $this->paginate();
    }

    /**
     * @return void
     */
    private function paginate()
    {
        $this->maxPages = ceil($this->totalItems / $this->itemsPerPage) > 1 ?
            ceil($this->totalItems / $this->itemsPerPage) : null;
        $this->items = array_slice($this->allItems, ($this->page - 1) * $this->itemsPerPage, $this->itemsPerPage );

    }

    /**
     * @return array
     */
    public function getItems(): array
    {
        return ["items" => $this->items, 'totalPages' => $this->maxPages];
    }
}