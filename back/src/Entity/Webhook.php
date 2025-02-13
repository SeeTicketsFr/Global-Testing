<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Enum\WebhookEventType;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: [
        'groups' => ['webhook:read'],
    ],
)]
class Webhook
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[Assert\NotBlank]
    #[Groups(['webhook:read'])]
    private Uuid $id;

    #[Assert\NotBlank]
    #[ORM\ManyToOne(targetEntity: Scenario::class, inversedBy: 'webhooks')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private ?Scenario $scenario;

    #[ORM\Column(type: 'string', enumType: WebhookEventType::class)]
    #[Assert\NotBlank]
    #[Assert\Choice(callback: [WebhookEventType::class, 'cases'])]
    #[Groups(['webhook:read'])]
    private WebhookEventType $eventType;

    #[ORM\Column(type: Types::STRING, length: 1000, nullable: false)]
    #[Groups(['webhook:read'])]
    #[Assert\NotBlank()]
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

    public function getScenario(): ?Scenario
    {
        return $this->scenario;
    }

    public function setScenario(?Scenario $scenario): self
    {
        $this->scenario = $scenario;

        return $this;
    }

    public function getEventType(): WebhookEventType
    {
        return $this->eventType;
    }

    public function setEventType(WebhookEventType $eventType): self
    {
        $this->eventType = $eventType;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }
}
