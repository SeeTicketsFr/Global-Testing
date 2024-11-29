<?php

namespace App\Entity\POPO\Logs;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\Entity\ContextHttpStep;
use App\Entity\POPO\HttpResponse;
use App\Entity\Traits\Steps\HttpStepTrait;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Get(
        ),
    ],
)]
class LogHttpStep extends LogAbstractStep
{
    use HttpStepTrait;

    #[Groups(['httpstep:read'])]
    protected ?HttpResponse $response;

    public function __construct()
    {
        parent::__construct();
    }

    public function createLog(ContextHttpStep $step, ?string $error = null): self
    {
        $this->id = $step->getId();
        $this->name = $step->getName();
        $this->stepNumber = $step->getStepNumber();
        $this->variables = $step->getVariables();
        $this->runAfterFailure = $step->getRunAfterFailure();
        $this->method = $step->getMethod();
        $this->checkConditions = $step->getCheckConditions();
        $this->treatment = $step->getTreatment();
        $this->url = $step->getUrl();
        $this->content = $step->getContent();
        $this->headers = $step->getHeaders();
        $this->response = $step->getResponse();
        $this->error = $error;

        return $this;
    }

    public function getResponse(): ?HttpResponse
    {
        return $this->response;
    }

    public function setResponse(HttpResponse $response): self
    {
        $this->response = $response;

        return $this;
    }
}
