<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Entity\POPO\Logs\LogAbstractStep;
use App\Repository\LogRepository;
use App\State\LogProvider;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Dunglas\DoctrineJsonOdm\Type\JsonDocumentType;
use Gedmo\Mapping\Annotation\Timestampable;
use OwlCorp\DoctrineMicrotime\DBAL\Types\DateTimeMicroType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: LogRepository::class)]
#[ApiResource(
    paginationItemsPerPage: 10,
    operations: [
        new GetCollection(
            uriTemplate: '/logs/{idExecution}',
            uriVariables: [
                'idExecution',
            ],
            paginationItemsPerPage: 100,
        ),
        new GetCollection(
            uriTemplate: '/logs/scenarios/{idScenario}',
            uriVariables: [
                'idScenario',
            ],
            provider: LogProvider::class,
        ),
    ],
    normalizationContext: [
        'groups' => ['log:read', 'step:read', 'httpstep:read', 'loopstep:read', 'sleepstep:read', 'sqsstep:read'],
    ],
    mercure: 'object.mercureOptions()',
)]
class Log
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[Assert\NotBlank]
    #[Groups(['log:read'])]
    private Uuid $id;

    #[ORM\Column(type: 'uuid')]
    #[Assert\NotBlank]
    #[Groups(['log:read'])]
    private Uuid $idExecution;

    #[ORM\Column(type: 'uuid', nullable: true)]
    #[Assert\NotBlank]
    #[Groups(['log:read'])]
    private ?Uuid $idScenario;

    #[ORM\Column(type: 'uuid', nullable: true)]
    #[Assert\NotBlank]
    #[Groups(['log:read'])]
    private ?Uuid $idStep;

    #[ORM\Column(type: Types::STRING, length: 1000)]
    #[Assert\NotBlank]
    #[Groups(['log:read'])]
    private string $humanDescription;

    #[ORM\Column(type: JsonDocumentType::NAME, nullable: true, options: ['jsonb' => true])]
    #[Groups(['log:read'])]
    private ?LogAbstractStep $step;

    #[ORM\Column(type: DateTimeMicroType::NAME)]
    #[Groups(['log:read'])]
    #[Timestampable(on: 'create')]
    private \DateTime $createdAt;

    public function __construct()
    {
        $this->id = Uuid::v6();
        $this->step = null;
    }

    /** @return array<mixed> */
    public function mercureOptions(): array
    {
        return [
            'topics' => [
                getenv('PUBLIC_URL').'/api/logs/'.$this->getIdExecution(),
            ],
        ];
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

    public function getIdExecution(): Uuid
    {
        return $this->idExecution;
    }

    public function setIdExecution(string|Uuid $uuid): self
    {
        $this->idExecution = \is_string($uuid) ? new Uuid($uuid) : $uuid;

        return $this;
    }

    public function getIdScenario(): ?Uuid
    {
        return $this->idScenario;
    }

    public function setIdScenario(string|Uuid $uuid): self
    {
        $this->idScenario = \is_string($uuid) ? new Uuid($uuid) : $uuid;

        return $this;
    }

    public function getIdStep(): ?Uuid
    {
        return $this->idStep;
    }

    public function setIdStep(string|Uuid $uuid): self
    {
        $this->idStep = \is_string($uuid) ? new Uuid($uuid) : $uuid;

        return $this;
    }

    public function getHumanDescription(): ?string
    {
        return $this->humanDescription;
    }

    public function setHumanDescription(string $humanDescription): self
    {
        $this->humanDescription = $humanDescription;

        return $this;
    }

    public function getStep(): ?LogAbstractStep
    {
        return $this->step;
    }

    public function setStep(LogAbstractStep $step): self
    {
        $this->step = $step;

        return $this;
    }

    public function getCreatedAt(): \DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTime $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
