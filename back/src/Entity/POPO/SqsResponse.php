<?php

namespace App\Entity\POPO;

use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[Assert\Cascade]
class SqsResponse
{
    #[Groups(['sqsstep:read'])]
    private ?int $status;

    /** @var array<mixed> $data */
    #[Groups(['sqsstep:read'])]
    private ?array $data;

    /** @var array<mixed> $metadata */
    #[Groups(['sqsstep:read'])]
    private ?array $metadata;

    /**
     * @param array<mixed> $data
     * @param array<mixed> $metadata
     */
    public function __construct(?int $status = null, ?array $data = null, ?array $metadata = null)
    {
        $this->status = $status;
        $this->data = $data;
        $this->metadata = $metadata;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(?int $status): self
    {
        $this->status = $status;

        return $this;
    }

    /** @return array<mixed> */
    public function getData(): ?array
    {
        return $this->data;
    }

    /** @param array<mixed> $data */
    public function setData(?array $data): self
    {
        $this->data = $data;

        return $this;
    }

    /** @return array<mixed> */
    public function getMetadata(): ?array
    {
        return $this->metadata;
    }

    /** @param array<mixed> $metadata */
    public function setMetadata(?array $metadata): self
    {
        $this->metadata = $metadata;

        return $this;
    }
}
