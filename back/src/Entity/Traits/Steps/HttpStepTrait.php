<?php

namespace App\Entity\Traits\Steps;

use App\Entity\Enum\HttpMethodsType;
use App\Entity\POPO\Treatment;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Dunglas\DoctrineJsonOdm\Type\JsonDocumentType;
use Symfony\Component\Serializer\Annotation\Groups;

trait HttpStepTrait
{
    #[ORM\Column(type: Types::STRING, length: 255, nullable: false, enumType: HttpMethodsType::class)]
    #[Groups(['httpstep:read'])]
    protected HttpMethodsType $method;

    #[ORM\Column(type: Types::STRING, length: 1000, nullable: false)]
    #[Groups(['httpstep:read'])]
    protected string $url;

    /** @var array<string, mixed> */
    #[ORM\Column(type: Types::JSON, nullable: true, options: ['jsonb' => true])]
    #[Groups(['httpstep:read'])]
    protected ?array $content = [];

    /** @var array<string, string> */
    #[ORM\Column(type: Types::JSON, nullable: true, options: ['jsonb' => true])]
    #[Groups(['httpstep:read'])]
    protected ?array $headers = [];

    /** @var array<string, string> */
    #[ORM\Column(type: Types::JSON, nullable: true, options: ['jsonb' => true])]
    #[Groups(['httpstep:read'])]
    protected ?array $checkConditions = [];

    /**
     * @var array<Treatment>
     */
    #[ORM\Column(type: JsonDocumentType::NAME, nullable: true, options: ['jsonb' => true])]
    #[Groups(['httpstep:read'])]
    protected ?array $treatment;

    public function __construct()
    {
        parent::__construct();
    }

    public function getMethod(): HttpMethodsType
    {
        return $this->method;
    }

    public function setMethod(HttpMethodsType $method): self
    {
        $this->method = $method;

        return $this;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

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

    /**
     * @return array<string, string>
     */
    public function getHeaders(): ?array
    {
        return $this->headers;
    }

    public function addHeaders(string $key, string $value): void
    {
        $this->headers[$key] = $value;
    }

    /**
     * @param array<string, string> $headers
     */
    public function setHeaders(array $headers): self
    {
        $this->headers = $headers;

        return $this;
    }

    /**
     * @return array<Treatment>
     */
    public function getTreatment(): ?array
    {
        return $this->treatment;
    }

    public function addTreatment(Treatment $t): static
    {
        $this->treatment[] = $t;

        return $this;
    }

    /**
     * @param array<Treatment> $treatment
     */
    public function setTreatment(?array $treatment): self
    {
        $this->treatment = $treatment;

        return $this;
    }

    /**
     * @return array<string, string>
     */
    public function getCheckConditions(): ?array
    {
        return $this->checkConditions;
    }

    public function addCheckCondition(string $key, string $value): void
    {
        $this->checkConditions[$key] = $value;
    }

    /**
     * @param array<string, string> $checkConditions
     */
    public function setCheckConditions(array $checkConditions): self
    {
        $this->checkConditions = $checkConditions;

        return $this;
    }
}
