import { useStep } from "@/app/_hooks/useStep";
import { HttpStepAppTyped, SqsStepAppTyped } from "@/app/_type/Step";
import AutocompleteInput from "@/components/shared-components/Autocomplete/AutocompleteInput";
import { Label } from "@radix-ui/react-dropdown-menu";
import _ from "lodash";
import { useTranslations } from "next-intl";

export function AccessKey() {
  const { currentStep, updateStep, } = useStep();
  const tStep = useTranslations('step');

  function handleChange(value: string) {
    if (!_.isNull(currentStep)) {
      const updatedStep = { ...currentStep, accessKey: value };
      updateStep(updatedStep);
    }
  }

  return (
    <div className="grid gap-1 text-center">
        <Label className="text-xs font-bold">{tStep('accessKey')}</Label>
        <AutocompleteInput placeholder={tStep('accessKey')} value={(currentStep as SqsStepAppTyped)?.accessKey ?? ""} onChange={(e: string) => handleChange(e)}/>
    </div>
  );
}