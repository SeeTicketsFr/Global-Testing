<?php

namespace App\Tests\Functional\Stub;

use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Jwt\TokenFactoryInterface;
use Symfony\Component\Mercure\Jwt\TokenProviderInterface;
use Symfony\Component\Mercure\Update;

class HubStub implements HubInterface
{
    private string $url;
    private TokenProviderInterface $jwtProvider;
    private ?TokenFactoryInterface $jwtFactory;
    private ?string $publicUrl;

    public function __construct(
        string $url,
        TokenProviderInterface $jwtProvider,
        ?TokenFactoryInterface $jwtFactory = null,
        ?string $publicUrl = null,
    ) {
        $this->url = $url;
        $this->jwtProvider = $jwtProvider;
        $this->publicUrl = $publicUrl;
        $this->jwtFactory = $jwtFactory;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function getPublicUrl(): string
    {
        return $this->publicUrl ?? $this->getUrl();
    }

    public function getProvider(): TokenProviderInterface
    {
        return $this->jwtProvider;
    }

    public function getFactory(): ?TokenFactoryInterface
    {
        return $this->jwtFactory;
    }

    public function publish(Update $update): string
    {
        return 'fake message published';
    }
}
