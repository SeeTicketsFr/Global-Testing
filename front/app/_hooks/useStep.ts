import { useAtom } from 'jotai';
import { currentStepAtom, scenarioAtom } from '@/lib/atoms';
import { StepsAppTyped } from '@/app/_type/Step';

export function useStep() {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
  const [scenario, setScenario] = useAtom(scenarioAtom);

  function updateStep(updatedStep: StepsAppTyped) {
    setCurrentStep(updatedStep);
    
    const scenarioIndex = scenario.steps.findIndex(step => step.id === updatedStep.id);
    if (scenarioIndex !== -1) {
      const newSteps = [...scenario.steps];
      newSteps[scenarioIndex] = updatedStep;
      setScenario({ ...scenario, steps: newSteps });
    }
  }

  return {
    currentStep,
    updateStep,
    scenario
  };
}
