<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\Dto\ApiDocumentation\ApiDocumentationFileOutput;
use App\State\ApiDocumentationProvider;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity]
#[ApiResource(
    paginationItemsPerPage: 10,
    paginationClientItemsPerPage: true,
    normalizationContext: [
        'groups' => ['apidocumentation:read'],
    ],
)]
#[ApiResource(
    paginationItemsPerPage: 10,
    normalizationContext: [
        'groups' => ['apidocumentation:read'],
    ],
    operations: [
        new Get(
            uriTemplate: '/api_documentations/{id}/file',
            uriVariables: [
                'id',
            ],
            cacheHeaders: [
                'max_age' => 1800, // 30 minutes
                'shared_max_age' => 1800, // 30 minutes
            ],
            provider: ApiDocumentationProvider::class,
            output: ApiDocumentationFileOutput::class,
        ),
    ]
)]
class ApiDocumentation
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[Groups(['apidocumentation:read'])]
    private Uuid $id;

    #[ORM\Column(type: Types::STRING, length: 1000, nullable: false)]
    #[Groups(['apidocumentation:read'])]
    private string $name;

    #[ORM\Column(type: Types::STRING, length: 1000, nullable: false)]
    #[Groups(['apidocumentation:read'])]
    private string $url;

    public function __construct()
    {
        $this->id = Uuid::v6();
    }

    public function getId(): Uuid
    {
        return $this->id;
    }

    public function setId(string|Uuid $uuid): self
    {
        $this->id = \is_string($uuid) ? new Uuid($uuid) : $uuid;

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

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }
}
