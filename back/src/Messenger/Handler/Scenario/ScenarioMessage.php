<?php

declare(strict_types=1);

namespace App\Messenger\Handler\Scenario;

use App\Messenger\Handler\AbstractMessage;
use Symfony\Component\Uid\Uuid;

final class ScenarioMessage extends AbstractMessage
{
    private Uuid $idScenario;
    private ?Uuid $idExecution;

    public function __construct(Uuid $idScenario, ?Uuid $idExecution = null)
    {
        parent::__construct();
        $this->idScenario = $idScenario;
        $this->idExecution = $idExecution;
    }

    public function getIdScenario(): Uuid
    {
        return $this->idScenario;
    }

    public function setIdScenario(Uuid $idScenario): self
    {
        $this->idScenario = $idScenario;

        return $this;
    }

    public function getIdExecution(): ?Uuid
    {
        return $this->idExecution;
    }

    public function setIdExecution(Uuid $idExecution): self
    {
        $this->idExecution = $idExecution;

        return $this;
    }
}
