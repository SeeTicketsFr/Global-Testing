<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: [
        'groups' => ['metrics:read'],
    ],
)]
class ScenarioMetrics
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[Groups(['metrics:read'])]
    private Uuid $id;

    #[Assert\NotBlank]
    #[ORM\OneToOne(targetEntity: Scenario::class, inversedBy: 'metrics', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private Scenario $scenario;

    #[ORM\Column(type: Types::INTEGER)]
    #[Assert\NotBlank]
    #[Assert\PositiveOrZero()]
    #[Groups(['metrics:read'])]
    private int $totalExecutions = 0;

    #[ORM\Column(type: Types::INTEGER)]
    #[Assert\NotBlank]
    #[Assert\PositiveOrZero()]
    #[Groups(['metrics:read'])]
    private int $successExecutions = 0;

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

    public function getScenario(): Scenario
    {
        return $this->scenario;
    }

    public function setScenario(Scenario $scenario): self
    {
        $this->scenario = $scenario;

        return $this;
    }

    public function getTotalExecutions(): int
    {
        return $this->totalExecutions;
    }

    public function setTotalExecutions(int $totalExecutions): self
    {
        $this->totalExecutions = $totalExecutions;

        return $this;
    }

    public function getSuccessExecutions(): int
    {
        return $this->successExecutions;
    }

    public function setSuccessExecutions(int $successExecutions): self
    {
        $this->successExecutions = $successExecutions;

        return $this;
    }
}
