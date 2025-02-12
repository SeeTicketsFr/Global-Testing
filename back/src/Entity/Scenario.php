<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: [
        'groups' => ['scenario:read', 'step:read', 'httpstep:read', 'loopstep:read', 'sleepstep:read', 'sqsstep:read', 'metrics:read', 'webhook:read'],
    ],
    denormalizationContext: ['groups' => ['scenario:write']],
)]
class Scenario
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[Groups(['scenario:read'])]
    private Uuid $id;

    #[ORM\Column(type: Types::STRING, length: 255)]
    #[Assert\NotBlank]
    #[Groups(['scenario:read', 'scenario:write'])]
    private string $name;

    /**
     * @var Collection<int, AbstractStep>
     */
    #[ORM\OneToMany(mappedBy: 'scenario', targetEntity: AbstractStep::class, cascade: ['persist', 'remove'])]
    #[Groups(['step:read', 'httpstep:read', 'loopstep:read', 'sleepstep:read', 'sqsstep:read'])]
    #[ORM\OrderBy(['stepNumber' => 'ASC'])]
    private Collection $steps;

    /**
     * @var Collection<int, Webhook>
     */
    #[ORM\OneToMany(mappedBy: 'scenario', targetEntity: Webhook::class, cascade: ['persist', 'remove'])]
    #[Groups(['webhook:read'])]
    private ?Collection $webhooks;

    /**
     * @var array<string, string>
     */
    #[ORM\Column(type: Types::JSON, nullable: true, options: ['jsonb' => true])]
    #[Groups(['scenario:read', 'scenario:write'])]
    private ?array $variables = [];

    #[ORM\Column(type: Types::STRING, length: 255, nullable: true)]
    #[Groups(['scenario:read', 'scenario:write'])]
    private ?string $cron;

    #[ORM\OneToOne(mappedBy: 'scenario', targetEntity: ScenarioMetrics::class, cascade: ['persist', 'remove'])]
    #[Groups(['metrics:read'])]
    private ?ScenarioMetrics $metrics;

    public function __construct()
    {
        $this->id = Uuid::v6();
        $this->steps = new ArrayCollection();
        $this->webhooks = new ArrayCollection();
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

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function hasSteps(): bool
    {
        return \count($this->steps) > 0;
    }

    /**
     * @return Collection<int, AbstractStep>
     */
    public function getSteps(): Collection
    {
        return $this->steps;
    }

    public function addStep(AbstractStep $step): self
    {
        if (!$this->steps->contains($step)) {
            $this->steps[] = $step;
            $step->setScenario($this);
        }

        return $this;
    }

    public function removeStep(AbstractStep $step): self
    {
        if ($this->steps->removeElement($step) && $step->getScenario() === $this) {
            $step->setScenario(null);
        }

        return $this;
    }

    public function hasWebhooks(): bool
    {
        return \count($this->webhooks) > 0;
    }

    /**
     * @return Collection<int, Webhook>
     */
    public function getWebhooks(): ?Collection
    {
        return $this->webhooks;
    }

    public function addWebhook(Webhook $webhook): self
    {
        if (!$this->webhooks->contains($webhook)) {
            $this->webhooks[] = $webhook;
            $webhook->setScenario($this);
        }

        return $this;
    }

    public function removeWebhook(Webhook $webhook): self
    {
        if ($this->webhooks->removeElement($webhook) && $webhook->getScenario() === $this) {
            $webhook->setScenario(null);
        }

        return $this;
    }

    /**
     * @return array<string, string>
     */
    public function getVariables(): ?array
    {
        return $this->variables;
    }

    public function addVariable(string $key, string $value): void
    {
        $this->variables[$key] = $value;
    }

    /**
     * @param array<string, string> $variables
     */
    public function setVariables(array $variables): self
    {
        $this->variables = $variables;

        return $this;
    }

    public function getCron(): ?string
    {
        return $this->cron;
    }

    public function setCron(string $cron): self
    {
        $this->cron = $cron;

        return $this;
    }

    public function getMetrics(): ?ScenarioMetrics
    {
        return $this->metrics;
    }

    public function setMetrics(ScenarioMetrics $metrics): self
    {
        $this->metrics = $metrics;

        return $this;
    }
}
