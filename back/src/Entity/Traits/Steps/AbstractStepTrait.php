<?php

namespace App\Entity\Traits\Steps;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

trait AbstractStepTrait
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[Groups(['step:read'])]
    protected Uuid $id;

    #[Assert\NotBlank]
    #[ORM\Column(type: Types::STRING, length: 255)]
    #[Groups(['step:read'])]
    protected string $name;

    #[Assert\NotBlank]
    #[ORM\Column(type: Types::INTEGER)]
    #[Groups(['step:read'])]
    protected int $stepNumber;

    /**
     * @var array<string, string>
     */
    #[ORM\Column(type: Types::JSON, nullable: true, options: ['jsonb' => true])]
    #[Groups(['step:read'])]
    protected ?array $variables = [];

    #[ORM\Column(type: Types::BOOLEAN, nullable: false, options: ['default' => false])]
    #[Groups(['step:read'])]
    protected ?bool $runAfterFailure = false;

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

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getStepNumber(): int
    {
        return $this->stepNumber;
    }

    public function setStepNumber(int $stepNumber): self
    {
        $this->stepNumber = $stepNumber;

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

    public function getRunAfterFailure(): ?bool
    {
        return $this->runAfterFailure;
    }

    public function setRunAfterFailure(bool $runAfterFailure): self
    {
        $this->runAfterFailure = $runAfterFailure;

        return $this;
    }
}
