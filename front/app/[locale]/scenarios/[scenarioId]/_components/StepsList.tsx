import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import AddStep from "@/app/[locale]/scenarios/[scenarioId]/_components/AddStep";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { currentStepAtom, initialScenarioAtom, modifiedInitialScenarioAtom, scenarioAtom } from "@/lib/atoms";
import { useTranslations } from "next-intl";
import { Dot, GripVertical } from "lucide-react";
import { useState } from "react";
import { StepsAppTyped } from "@/app/_type/Step";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { HoverCardContent } from "@radix-ui/react-hover-card";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { handleSave, unformatStep } from "@/app/_store/utils";
import { toast } from "@/components/ui/use-toast";
import _ from "lodash";
import { Scenario } from "@/app/_type/Scenario";
import { ScenarioMetricsJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead } from "@/services";

interface StepProps {
  step: StepsAppTyped,
  index: number,
  currentStep: StepsAppTyped | null,
  setCurrentStep: any,
  setIsScenario: any,
  isStepModified: any,
  isScenario: boolean,
  tSave: any
}

function Step({ step, index, currentStep, setCurrentStep, setIsScenario, isStepModified, isScenario, tSave }: StepProps) {
  return (
    <div className="w-fit max-w-full">
    <Draggable key={step.id} draggableId={step.id?.toString() ?? ''} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="mb-2 flex items-center"
        >
          <div {...provided.dragHandleProps}>
            <GripVertical className="mr-2 cursor-pointer" />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={(currentStep?.stepNumber === step.stepNumber && !isScenario) ? "secondary" : "outline"}
                  onClick={() => {
                    setIsScenario(false);
                    setCurrentStep(step);
                  }}
                  className="flex justify-between max-w-32"
                >
                  <h1 className="text-sm truncate">{step.stepNumber} - {step.name}</h1>
                  {isStepModified(step.id || '') && (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Dot color="#ff9a47" />
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <h1>{tSave('not_saved')}</h1>
                      </HoverCardContent>
                    </HoverCard>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <h1 className="text-sm">{step.name} ({step.type})</h1>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </Draggable>
    </div>
  );
}

export function StepsList() {
  const [scenario, setScenario] = useAtom(scenarioAtom);
  const [modifiedScenario] = useAtom(modifiedInitialScenarioAtom);
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
  const tStep = useTranslations('step');
  const tSave = useTranslations('save');
  const tErrors = useTranslations('errors');
  const [isScenario, setIsScenario] = useState(true);
  const [initialScenario, setInitialScenario] = useAtom(initialScenarioAtom);

  const reorder = (list: StepsAppTyped[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    const updatedSteps = result.map((step, index) => ({
      ...step,
      stepNumber: index + 1,
    }));

    setScenario((prevScenario: Scenario) => ({
      ...prevScenario,
      steps: updatedSteps,
    }));

    handleSaveAll({
      ...scenario,
      steps: updatedSteps,
    });
    return updatedSteps;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    reorder(scenario.steps, result.source.index, result.destination.index);
  };

  function handleSaveAll(scenario: Scenario) {
    const savePromises = scenario.steps.map((step) => handleSave(step));

    Promise.all(savePromises)
      .then(() => {
        const updatedInitialScenarioSteps = scenario.steps.map((step) => unformatStep(step));
        setInitialScenario((prevInitialScenario: ScenarioMetricsJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead) => ({
          ...prevInitialScenario,
          steps: updatedInitialScenarioSteps,
        }));
        setScenario(scenario);
        toast({
          title: tStep('modification_title'),
          description: tStep('all_modifications_saved_description'),
        });
      })
      .catch((error) => {
        toast({
          title: tStep('modification_title'),
          description: tErrors('default') + error,
        });
        console.error(tErrors('default') + error);
      });
  }

  const isStepModified = (stepId: string) => {
    const originalStep = modifiedScenario.steps.find((step) => step.id === stepId);
    const currentStep = scenario.steps.find((step) => step.id === stepId);
    return JSON.stringify(originalStep) !== JSON.stringify(currentStep);
  };

  return (
    <section className="h-full w-full flex flex-col gap-4">
      <div className="flex flex-col justify-center items-center">
        <section className="w-full flex flex-col justify-center gap-4 items-center">
          <h4 className="text-sm font-medium leading-none">{tStep('steps')}</h4>
          <AddStep scenarioId={scenario.id} stepsNumber={scenario.steps.length} />
          <Separator orientation="horizontal" />
        </section>
      </div>
      <section className="w-full flex flex-col justify-center gap-4 items-center">
        <Button
          variant={isScenario ? "secondary" : "outline"}
          onClick={() => {
            setCurrentStep(null);
            setIsScenario(true);
          }}
          className="flex justify-start w-full"
        >
          <h1 className="text-sm truncate">{scenario.name}</h1>
        </Button>
      </section>
      <ScrollArea className="[&>div>div[style]]:!block">
        <section className="flex flex-col h-full justify-start items-center gap-4 px-4">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {scenario.steps.map((step, index) => (
                    <Step
                      key={step.id}
                      step={step}
                      index={index}
                      currentStep={currentStep}
                      setCurrentStep={setCurrentStep}
                      setIsScenario={setIsScenario}
                      isStepModified={isStepModified}
                      isScenario={isScenario}
                      tSave={tSave}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </section>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
