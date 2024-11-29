import { useStep } from "@/app/_hooks/useStep";
import { HttpStepAppTyped, SqsStepAppTyped } from "@/app/_type/Step";
import AutocompleteInput from "@/components/shared-components/Autocomplete/AutocompleteInput";
import { Label } from "@radix-ui/react-dropdown-menu";
import _ from "lodash";
import { useTranslations } from "next-intl";

export function SecretKey() {
  const { currentStep, updateStep, } = useStep();
  const tStep = useTranslations('step');

  function handleChange(value: string) {
    if (!_.isNull(currentStep)) {
      const updatedStep = { ...currentStep, secretKey: value };
      updateStep(updatedStep);
    }
  }

  return (
    <div className="grid gap-1 text-center">
        <Label className="text-xs font-bold">{tStep('secretKey')}</Label>
        <AutocompleteInput placeholder={tStep('secretKey')} value={(currentStep as SqsStepAppTyped)?.secretKey ?? ""} onChange={(e: string) => handleChange(e)}/>
    </div>
  );
}