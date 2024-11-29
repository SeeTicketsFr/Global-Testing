import { useStep } from "@/app/_hooks/useStep";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import _ from "lodash";
import { useTranslations } from "next-intl";
export function RunAfterFailure() {
  const { currentStep, updateStep, } = useStep();
  const tStep = useTranslations('step');

  function handleChange(value: boolean) {
    if (!_.isNull(currentStep)) {
      const updatedStep = { ...currentStep, runAfterFailure: value };
      updateStep(updatedStep);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center gap-2 pb-4">
       <Label htmlFor="run-after-failure" className="truncate">{tStep('runAfterFailure.title')}</Label>
        <Switch
          checked={currentStep?.runAfterFailure}
          onCheckedChange={handleChange}
        />
    </section>
  );
};
