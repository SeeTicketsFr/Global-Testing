<?php

namespace App\Entity;

use App\Entity\POPO\HttpResponse;

class ContextHttpStep extends HttpStep
{
    private ?HttpResponse $response;

    public function __construct()
    {
        parent::__construct();
        $this->response = new HttpResponse(0, [], []);
    }

    public function createContext(HttpStep $httpStep): self
    {
        $this->id = $httpStep->getId();
        $this->name = $httpStep->getName();
        $this->stepNumber = $httpStep->getStepNumber();
        $this->method = $httpStep->getMethod();
        $this->checkConditions = $httpStep->getCheckConditions();
        $this->treatment = $httpStep->getTreatment();
        $this->url = $httpStep->getUrl();
        $this->content = $httpStep->getContent();
        $this->headers = $httpStep->getHeaders();
        $this->scenario = $httpStep->getScenario();
        $this->variables = $httpStep->getVariables();
        $this->runAfterFailure = $httpStep->getRunAfterFailure();

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
