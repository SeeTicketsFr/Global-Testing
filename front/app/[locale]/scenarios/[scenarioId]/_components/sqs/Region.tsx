import { useStep } from "@/app/_hooks/useStep";
import { HttpStepAppTyped, SqsStepAppTyped } from "@/app/_type/Step";
import AutocompleteInput from "@/components/shared-components/Autocomplete/AutocompleteInput";
import { Label } from "@radix-ui/react-dropdown-menu";
import _ from "lodash";
import { useTranslations } from "next-intl";

export function Region() {
  const { currentStep, updateStep, } = useStep();
  const tStep = useTranslations('step');

  function handleChange(value: string) {
    if (!_.isNull(currentStep)) {
      const updatedStep = { ...currentStep, region: value };
      updateStep(updatedStep);
    }
  }

  return (
    <div className="grid gap-1 text-center">
        <Label className="text-xs font-bold">{tStep('region')}</Label>
        <AutocompleteInput placeholder={tStep('region')} value={(currentStep as SqsStepAppTyped)?.region ?? ""} onChange={(e: string) => handleChange(e)}/>
    </div>
  );
}