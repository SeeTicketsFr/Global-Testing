import { useStep } from "@/app/_hooks/useStep";
import { HttpStepAppTyped } from "@/app/_type/Step";
import AutocompleteInput from "@/components/shared-components/Autocomplete/AutocompleteInput";
import { Label } from "@/components/ui/label";
import _ from "lodash";
import { useTranslations } from "next-intl";
export function Url() {
  const { currentStep, updateStep, } = useStep();
  const tStep = useTranslations('step');

  function handleChange(value: string) {
    if (!_.isNull(currentStep)) {
      const updatedStep = { ...currentStep, url: value };
      updateStep(updatedStep);
    }
  }

  return (
    <AutocompleteInput placeholder={tStep('url')} value={(currentStep as HttpStepAppTyped)?.url ?? `${process.env.NEXT_PUBLIC_API_PUBLIC_URL}/api/http_steps`} onChange={(e: string) => handleChange(e)}/>
  );
}