<?php

namespace App\Entity\Traits\Steps;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

trait SqsStepTrait
{
    #[ORM\Column(type: Types::STRING, length: 1000, nullable: false)]
    #[Groups(['sqsstep:read'])]
    protected string $url;

    #[ORM\Column(type: Types::STRING, length: 100, nullable: false)]
    #[Groups(['sqsstep:read'])]
    protected string $region;

    #[ORM\Column(type: Types::STRING, length: 100, nullable: false)]
    #[Groups(['sqsstep:read'])]
    protected string $accessKey;

    #[ORM\Column(type: Types::STRING, length: 100, nullable: false)]
    #[Groups(['sqsstep:read'])]
    protected string $secretKey;

    #[ORM\Column(type: Types::STRING, length: 100, nullable: false)]
    #[Groups(['sqsstep:read'])]
    protected string $messageGroupId;

    /** @var array<string, mixed> */
    #[ORM\Column(type: Types::JSON, nullable: true, options: ['jsonb' => true])]
    #[Groups(['sqsstep:read'])]
    protected ?array $content = [];

    public function getUrl(): string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    public function getRegion(): string
    {
        return $this->region;
    }

    public function setRegion(string $region): self
    {
        $this->region = $region;

        return $this;
    }

    public function getAccessKey(): string
    {
        return $this->accessKey;
    }

    public function setAccessKey(string $accessKey): self
    {
        $this->accessKey = $accessKey;

        return $this;
    }

    public function getSecretKey(): string
    {
        return $this->secretKey;
    }

    public function setSecretKey(string $secretKey): self
    {
        $this->secretKey = $secretKey;

        return $this;
    }

    public function getMessageGroupId(): string
    {
        return $this->messageGroupId;
    }

    public function setMessageGroupId(string $messageGroupId): self
    {
        $this->messageGroupId = $messageGroupId;

        return $this;
    }

    /**
     * @return array<mixed>
     */
    public function getContent(): ?array
    {
        return $this->content;
    }

    /**
     * @param array<mixed> $content
     */
    public function setContent(array $content): self
    {
        $this->content = $content;

        return $this;
    }
}
