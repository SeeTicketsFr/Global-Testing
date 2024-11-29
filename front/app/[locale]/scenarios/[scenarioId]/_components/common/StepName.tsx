import { useStep } from "@/app/_hooks/useStep";
import { Input } from "@/components/ui/input"
import _ from "lodash";
export function StepName() {
  const { currentStep, updateStep, } = useStep();

  function handleChange(value: string) {
    if (!_.isNull(currentStep)) {
      const updatedStep = { ...currentStep, name: value };
      updateStep(updatedStep);
    }
  }

    return (
      <Input value={currentStep?.name} onChange={(e) => handleChange(e.target.value)}/>
    );
};
