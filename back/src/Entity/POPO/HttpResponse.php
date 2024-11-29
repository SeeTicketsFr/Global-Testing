<?php

namespace App\Entity\POPO;

use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[Assert\Cascade]
class HttpResponse
{
    #[Groups(['httpstep:read'])]
    private int $statusCode = 0;

    /** @var array<mixed> */
    #[Groups(['httpstep:read'])]
    private array $headers = [];

    /** @var array<mixed> */
    #[Groups(['httpstep:read'])]
    private array $content = [];

    /**
     * @param array<mixed> $headers
     * @param array<mixed> $content
     */
    public function __construct(int $statusCode, array $headers, array $content)
    {
        $this->statusCode = $statusCode;
        $this->headers = $headers;
        $this->content = $content;
    }

    public function getStatusCode(): ?int
    {
        return $this->statusCode;
    }

    public function setStatusCode(int $statusCode): self
    {
        $this->statusCode = $statusCode;

        return $this;
    }

    /** @return array<mixed> */
    public function getHeaders(): array
    {
        return $this->headers;
    }

    /** @param array<mixed> $headers */
    public function setHeaders(array $headers): self
    {
        $this->headers = $headers;

        return $this;
    }

    /** @return array<mixed> */
    public function getContent(): array
    {
        return $this->content;
    }

    public function addContent(string $key, mixed $value): void
    {
        $this->content[$key] = $value;
    }

    /** @param array<mixed> $content */
    public function setContent(array $content): self
    {
        $this->content = $content;

        return $this;
    }
}
