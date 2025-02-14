import { StepsAppTyped } from "@/app/_type/Step";
import { Button } from "@/components/ui/button";
import { currentStepAtom, initialScenarioAtom, scenarioAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { Save } from "lucide-react";
import * as _ from 'lodash';
import { useTranslations } from "next-intl";
import { toast } from "@/components/ui/use-toast";
import { StepName } from "@/app/[locale]/scenarios/[scenarioId]/_components/common/StepName";
import { StepType } from "@/app/[locale]/scenarios/[scenarioId]/_components/common/StepType";
import { ScenarioName } from "@/app/[locale]/scenarios/[scenarioId]/_components/scenario/ScenarioName";
import { StepDelete } from "@/app/[locale]/scenarios/[scenarioId]/_components/common/StepDelete";
import { handleSave, unformatStep } from "@/app/_store/utils";
import { patchScenario } from "@/app/_store/Scenarios";
import { RunAfterFailure } from "@/app/[locale]/scenarios/[scenarioId]/_components/common/RunAfterFailure";
import ScenarioExecution from "@/components/shared-components/Logs/ScenarioExecution";
import { ScenarioMetricsJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsReadWebhookRead } from "@/services";

export function CommonDashboardHeader() {
    const [scenario, setScenario] = useAtom(scenarioAtom);
    const [initialScenario, setInitialScenario] = useAtom(initialScenarioAtom);
    const [currentStep] = useAtom(currentStepAtom);
    const tErrors = useTranslations('errors');
    const tStep = useTranslations('step');
    const tScenario = useTranslations('scenario');

  function handlePatchStepWorked(stepName: string) {
    toast({
      title: tStep('modification_title'),
      description: tStep('modification_saved_description', { stepName }),
    });
  }

  function handlePatchStepFailed(stepName: string) {
    toast({
      title: tStep('modification_title'),
      description: tStep('modification_saved_description', { stepName }),
    });
  }

  function handlePatchScenarioWorked(scenarioName: string) {
    toast({
      title: tScenario('modification_title'),
      description: tScenario('modification_saved_description', { scenarioName }),
    });
  }

  function handlePatchScenarioFailed(scenarioName: string) {
    toast({
      title: tScenario('modification_title'),
      description: tScenario('modification_saved_description', { scenarioName }),
    });
  }

  function handleSaveAll() {
    const savePromises = scenario.steps.map((step: StepsAppTyped) => handleSave(step));

    Promise.all(savePromises)
      .then(() => {
        const updatedInitialScenarioSteps = scenario.steps.map((step: StepsAppTyped) => unformatStep(step));
        setInitialScenario((prevInitialScenario: ScenarioMetricsJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsReadWebhookRead) => ({
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


    return (
      <section className="flex flex-wrap flex-col md:flex-row w-full h-fit items-center justify-between p-4 gap-4">
          {_.isNull(currentStep) ? (
            <section className="flex flex-wrap flex-col md:flex-row items-center gap-4">
              <ScenarioName />
              <ScenarioExecution {...scenario} />
            </section>

          ) : (
            <section className="flex flex-col md:flex-row items-center gap-4">
              <StepType />
              <StepName />
              <RunAfterFailure />
              <StepDelete />
            </section>
          )}
        <section className="flex flex-wrap flex-col md:flex-row items-center gap-4">
          <Button variant="default" onClick={() => {
            if(!_.isNull(currentStep)) {
              handleSave(currentStep).then(() => {
                if(!_.isUndefined(initialScenario) && !_.isUndefined(initialScenario.steps) && !_.isNull(currentStep)) {
                  const scenarioIndex = initialScenario.steps.findIndex((step: any) => step.id === currentStep.id);
                  if (scenarioIndex !== -1) {
                    const newSteps = [...initialScenario.steps];
                    newSteps[scenarioIndex] = unformatStep(currentStep);
                    setInitialScenario({ ...initialScenario, steps: newSteps });
                  }
                }
                handlePatchStepWorked(currentStep?.name ?? '');
              })
              .catch((error) => {
                handlePatchStepFailed(currentStep?.name ?? '');
                  console.error(tErrors('default') + error);
              });
            } else {
                setInitialScenario({ ...initialScenario, name: scenario.name, variables: scenario.variables, cron: scenario.cron })
                patchScenario({ id: initialScenario.id ?? '', data: { ...initialScenario, name: scenario.name, variables: scenario.variables, cron: scenario.cron } }).then(() => {
                  handlePatchScenarioWorked(scenario?.name);
                })
                .catch((error) => {
                  handlePatchScenarioFailed(scenario?.name);
                    console.error(tErrors('default') + error);
                });
            }
          }}>
            <Save className="h-4 w-5" />
            <h1>{tStep('save')}</h1>
          </Button>
          <Button variant="default" onClick={() => handleSaveAll()}>
            <Save strokeWidth={2} className="h-4 w-5" />
            <h1 className="font-semibold">{tStep('save_all')}</h1>
          </Button>
        </section>
      </section>
    )
  }