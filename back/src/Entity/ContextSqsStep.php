<?php

namespace App\Entity;

use App\Entity\POPO\SqsResponse;

class ContextSqsStep extends SqsStep
{
    private ?SqsResponse $response;

    public function __construct()
    {
        parent::__construct();
        $this->response = new SqsResponse();
    }

    public function createContext(SqsStep $sqsStep): self
    {
        $this->id = $sqsStep->getId();
        $this->name = $sqsStep->getName();
        $this->stepNumber = $sqsStep->getStepNumber();
        $this->variables = $sqsStep->getVariables();
        $this->runAfterFailure = $sqsStep->getRunAfterFailure();
        $this->url = $sqsStep->getUrl();
        $this->region = $sqsStep->getRegion();
        $this->accessKey = $sqsStep->getAccessKey();
        $this->secretKey = $sqsStep->getSecretKey();
        $this->messageGroupId = $sqsStep->getMessageGroupId();
        $this->content = $sqsStep->getContent();
        $this->scenario = $sqsStep->getScenario();

        return $this;
    }

    /**
     * @return SqsResponse $response
     */
    public function getResponse(): ?SqsResponse
    {
        return $this->response;
    }

    public function setResponse(?SqsResponse $response): self
    {
        $this->response = $response;

        return $this;
    }
}
