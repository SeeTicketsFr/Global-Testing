<?php

namespace App\Entity\POPO\Logs;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\Entity\ContextSqsStep;
use App\Entity\POPO\SqsResponse;
use App\Entity\Traits\Steps\SqsStepTrait;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Get(
        ),
    ],
)]
class LogSqsStep extends LogAbstractStep
{
    use SqsStepTrait;

    #[Groups(['sqsstep:read'])]
    protected ?SqsResponse $response;

    public function __construct()
    {
        parent::__construct();
    }

    public function createLog(ContextSqsStep $step, ?string $error = null): self
    {
        $this->id = $step->getId();
        $this->name = $step->getName();
        $this->stepNumber = $step->getStepNumber();
        $this->variables = $step->getVariables();
        $this->runAfterFailure = $step->getRunAfterFailure();
        $this->url = $step->getUrl();
        $this->region = $step->getRegion();
        $this->accessKey = $step->getAccessKey();
        $this->secretKey = $step->getSecretKey();
        $this->messageGroupId = $step->getMessageGroupId();
        $this->content = $step->getContent();
        $this->response = $step->getResponse();
        $this->error = $error;

        return $this;
    }

    /**
     * @return SqsResponse|null $response
     */
    public function getResponse(): ?SqsResponse
    {
        return $this->response;
    }

    public function setResponse(SqsResponse $response): self
    {
        $this->response = $response;

        return $this;
    }
}
