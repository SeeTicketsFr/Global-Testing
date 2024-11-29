import { deleteStep, handleSave } from "@/app/_store/utils";
import { DialogConfirmation } from "@/components/shared-components/Card/DialogConfirmation";
import { buttonVariants } from "@/components/ui/button";
import { currentStepAtom, scenarioAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import _ from "lodash";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";

export function StepDelete() {
    const [currentStep] = useAtom(currentStepAtom);
    const [scenario, setScenario] = useAtom(scenarioAtom);
    const tConfirmation = useTranslations('step.confirmation');

    // TODO: Modify step number for all steps (use N state (delete all step type variables and patchScenario (NOT SAVE ALL STEP CHANGES)))
    async function handleDelete() {
        if (!_.isNull(currentStep)) {
            await deleteStep(currentStep.id ?? '', currentStep.type);

            const updatedSteps = scenario.steps.filter(
                (step) => step.stepNumber !== currentStep.stepNumber
            );

            updatedSteps.forEach((step) => {
                if (!_.isUndefined(currentStep.stepNumber) && step.stepNumber > currentStep.stepNumber) {
                    step.stepNumber -= 1;
                }
                handleSave(step);
            });

            setScenario({
                ...scenario,
                steps: updatedSteps,
            });
        }
    }

    return (
        <DialogConfirmation
            translationPath='step'
            description={tConfirmation('confirmationDeleteDescription', { stepName: currentStep?.name })}
            handleSubmit={handleDelete}
            triggerChildren={
                <div className={buttonVariants({ variant: "destructive", size: "icon" })}>
                    <Trash className="h-4 w-4" />
                </div>
            }
        />
    );
};
