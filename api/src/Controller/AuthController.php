<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'auth_api')]
class AuthController extends AbstractController
{
    /**
     * @return null
     */
    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login()
    {
        return null;
    }

    /**
     * @return null
     */
    #[Route('/logout', name: 'logout', methods: ['POST'])]
    public function logout()
    {
        $response = new Response();
        $response->headers->clearCookie('BEARER');
        $response->headers->clearCookie('PHPSESSID');
        $response->send();

        return null;
    }
}