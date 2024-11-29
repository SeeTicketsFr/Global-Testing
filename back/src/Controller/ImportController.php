<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Enum\HttpMethodsType;
use App\Entity\Enum\StepType;
use App\Entity\HttpStep;
use App\Entity\LoopStep;
use App\Entity\Scenario;
use App\Entity\SleepStep;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

final class ImportController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/scenario/import', name: 'import', methods: ['POST'])]
    public function import(Request $request): JsonResponse
    {
        $jsonData = $request->getContent();

        $data = json_decode($jsonData, true);

        if (!\is_array($data)) {
            return new JsonResponse(['error' => 'Invalid JSON format'], Response::HTTP_BAD_REQUEST);
        }

        $scenario = new Scenario();
        $scenario->setName($data['name']);
        $scenario->setVariables($data['variables']);

        foreach ($data['steps'] as $stepData) {
            $type = $stepData['type'];
            switch (StepType::tryFrom($type)) {
                case StepType::SimpleHttp:
                    $step = new HttpStep();
                    if (!isset($stepData['method']) || null === HttpMethodsType::tryFrom($stepData['method'])) {
                        return new JsonResponse(['error' => 'HTTP Method not provided or wrong'], Response::HTTP_BAD_REQUEST);
                    }
                    $step->setMethod(HttpMethodsType::tryFrom($stepData['method']));
                    if (!isset($stepData['url'])) {
                        return new JsonResponse(['error' => 'No URL provided'], Response::HTTP_BAD_REQUEST);
                    }
                    $step->setUrl($stepData['url']);

                    if (isset($stepData['checkConditions'])) {
                        $step->setCheckConditions($stepData['checkConditions']);
                    }
                    if (isset($stepData['treatment'])) {
                        foreach ($stepData['treatment'] as $treatment) {
                            $step->addTreatment($treatment);
                        }
                    }
                    if (isset($stepData['headers'])) {
                        $step->setHeaders($stepData['headers']);
                    }
                    if (isset($stepData['content'])) {
                        $step->setContent($stepData['content']);
                    }
                    break;
                case StepType::Loop:
                    $step = new LoopStep();
                    if (isset($stepData['conditions'])) {
                        $step->setConditions($stepData['conditions']);
                    }
                    if (isset($stepData['stepToReturn'])) {
                        $step->setStepToReturn($stepData['stepToReturn']);
                    }
                    break;
                case StepType::Sleep:
                    $step = new SleepStep();
                    if (isset($stepData['duration'])) {
                        $step->setDuration($stepData['duration']);
                    }
                    break;
                default:
                    throw new \Exception('The type does not exists !');
            }

            $step->setName($stepData['name']);
            $step->setStepNumber($stepData['stepNumber']);
            $step->setScenario($scenario);
            $step->setRunAfterFailure($stepData['runAfterFailure']);
            if (isset($stepData['variables'])) {
                foreach ($stepData['variables'] as $name => $value) {
                    $step->addVariable($name, $value);
                }
            }
            $this->entityManager->persist($step);
            $scenario->addStep($step);
        }

        $this->entityManager->persist($scenario);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Import successful'], Response::HTTP_CREATED);
    }
}
