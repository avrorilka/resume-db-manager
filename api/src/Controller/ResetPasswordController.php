<?php

namespace App\Controller;

use App\Entity\ResetPasswordRequest;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use SymfonyCasts\Bundle\ResetPassword\Controller\ResetPasswordControllerTrait;
use SymfonyCasts\Bundle\ResetPassword\Exception\ResetPasswordExceptionInterface;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;

#[Route('/api/reset-password')]
class ResetPasswordController extends AbstractController
{
    use ResetPasswordControllerTrait;

    /**
     * @param ResetPasswordHelperInterface $resetPasswordHelper
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(ResetPasswordHelperInterface $resetPasswordHelper, EntityManagerInterface $entityManager)
    {
        $this->resetPasswordHelper = $resetPasswordHelper;

        $this->entityManager = $entityManager;
        $this->userRepository = $entityManager->getRepository(User::class);
        $this->tokenRepository = $entityManager->getRepository(ResetPasswordRequest::class);
    }

    /**
     * Display & process form to request a password reset
     *
     * @param Request $request
     * @param MailerInterface $mailer
     * @return Response
     * @throws TransportExceptionInterface
     */
    #[Route('', name: 'app_forgot_password_request', methods: ['POST'])]
    public function request(Request $request, MailerInterface $mailer): Response
    {
        $parameters = json_decode($request->getContent(), true);

        if (isset($parameters['email'])) {
            $response = new Response();
            $response->headers->clearCookie('BEARER');
            $response->send();

            return $this->processSendingPasswordResetEmail(
                $parameters['email'],
                $mailer
            );
        }
        return new Response('No email', Response::HTTP_BAD_REQUEST);
    }


    /**
     * Validates and process the reset URL that the user clicked in their email.
     *
     * @param string|null $token
     * @return Response
     */
    #[Route('/reset/{token}', name: 'app_reset_password')]
    public function resetRedirect(string $token = null): Response
    {
        if ($token) {
            $this->storeTokenInSession($token);
            return $this->redirectToRoute('app_reset_password');
        }

        $token = $this->getTokenFromSession();
        if (null === $token) {
            throw $this->createNotFoundException('No reset password token found in the URL or in the session.');
        }

        return $this->redirect('/reset-password/reset/' . $token);
    }

    /**
     * @param Request $request
     * @param UserPasswordHasherInterface $userPasswordHasher
     * @param string|null $token
     * @return Response
     */
    #[Route('/new-password/{token}', name: 'app_password', methods: ['POST'])]
    public function reset(Request $request, UserPasswordHasherInterface $userPasswordHasher, string $token = null): Response
    {
        $parameters = json_decode($request->getContent(), true);

        try {
            $user = $this->resetPasswordHelper->validateTokenAndFetchUser($token);
        } catch (ResetPasswordExceptionInterface $e) {
            $this->addFlash('reset_password_error', sprintf(
                'There was a problem validating your reset request - %s',
                $e->getReason()
            ));

            return $this->redirectToRoute('app_forgot_password_request');
        }
        $encodedPassword = $userPasswordHasher->hashPassword(
            $user,
            $parameters['password']
        );

        $user->setPassword($encodedPassword);
        $this->entityManager->flush();

        $this->resetPasswordHelper->removeResetRequest($token);
        $this->cleanSessionAfterReset();

        return new Response('Password has been changed successfully', Response::HTTP_OK);
    }

    /**
     * @param string $emailFormData
     * @param MailerInterface $mailer
     * @return Response
     * @throws TransportExceptionInterface
     */
    private function processSendingPasswordResetEmail(string $emailFormData, MailerInterface $mailer): Response
    {
        $user = $this->userRepository->findOneBy([
            'email' => $emailFormData,
        ]);

        $response = new Response('If an account matching your email exists, then an email was just sent!', Response::HTTP_OK);

        if (!$user) {
            return $response;
        }

        try {
            $resetToken = $this->resetPasswordHelper->generateResetToken($user);
        } catch (ResetPasswordExceptionInterface $e) {
            return $response;
        }

        $email = (new TemplatedEmail())
            ->from(new Address('b-practic22-test-mail@yopmail.com', 'b-practic22'))
            ->to($user->getEmail())
            ->subject('Password reset request')
            ->htmlTemplate('reset_password/email.html.twig')
            ->context(['resetToken' => $resetToken]);

        $mailer->send($email);
        $this->setTokenObjectInSession($resetToken);

        return new  $response;
    }
}
