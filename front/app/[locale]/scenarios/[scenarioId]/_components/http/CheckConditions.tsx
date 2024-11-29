import { useStep } from "@/app/_hooks/useStep";
import { HttpStepAppTyped } from "@/app/_type/Step";
import AutocompleteInput from "@/components/shared-components/Autocomplete/AutocompleteInput";
import NoResource from "@/components/shared-components/NoResource";
import { Button } from "@/components/ui/button";
import _ from 'lodash';
import { PlusCircle, Trash } from "lucide-react";
import { useTranslations } from 'next-intl';


export function CheckConditions() {
  const { currentStep, updateStep, } = useStep();
  const { checkConditions } = currentStep as HttpStepAppTyped;
  const tCheckConditions = useTranslations('step.checkConditions');

  function handleAddCheckCondition() {
    if (!_.isNull(currentStep) && !_.isUndefined(checkConditions)) {
      const newCheckConditionKey = '';
      const newObj = { ...currentStep, checkConditions: { ...checkConditions, [newCheckConditionKey]: '' } };
      updateStep(newObj);
    }
  }

  function handleCheckConditionChange(index: number, field: 'name' | 'value', value: string) {
    if (!_.isNull(currentStep) && !_.isUndefined(checkConditions)) {
      const updatedCheckConditions = Object.entries(checkConditions);

      if (field === 'name') {
        const [, oldValue] = updatedCheckConditions[index];
        updatedCheckConditions[index] = [value, oldValue];
      } else if (field === 'value') {
        const [key] = updatedCheckConditions[index];
        updatedCheckConditions[index] = [key, value];
      }

      const newCheckConditions = Object.fromEntries(updatedCheckConditions);
      const updatedObj = { ...currentStep, checkConditions: newCheckConditions };
      updateStep(updatedObj);
    }
  }


  function handleDeleteCheckCondition(index: number) {
    if (!_.isNull(currentStep) && !_.isUndefined(checkConditions)) {
      const updatedCheckConditions = { ...checkConditions };
      const keys = Object.keys(updatedCheckConditions);
      const key = keys[index];
      delete updatedCheckConditions[key];
      const updatedObj = { ...currentStep, checkConditions: updatedCheckConditions };
      updateStep(updatedObj);
    }
  }

  return (
    <section className="w-full space-y-[0.5em]">
      <section className="flex w-full justify-center">
        <Button variant="default" onClick={handleAddCheckCondition}>
          <PlusCircle className="h-4 w-5" />
          <h1>{tCheckConditions('add')}</h1>
        </Button>
      </section>
      {!_.isUndefined(checkConditions) && Object.keys(checkConditions).length > 0 ? (
        Object.entries(checkConditions).map(([key, value], index) => (
          <section key={index} className="w-full flex items-center">
            <AutocompleteInput
              className="focus-visible:ring-0 flex-grow-[4.5]"
              value={key}
              placeholder={tCheckConditions('key')}
              onChange={(e: string) => handleCheckConditionChange(index, 'name', e)}
            />
            <AutocompleteInput
              className="focus-visible:ring-0 flex-grow-[4.5]"
              value={value}
              placeholder={tCheckConditions('value')}
              onChange={(e: string) => handleCheckConditionChange(index, 'value', e)}
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDeleteCheckCondition(index)}
              className="flex-grow-1 flex-shrink-0"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </section>
        ))
      ) : (
        <NoResource text={tCheckConditions('no_checkCondition')} />
      )}
    </section>
  );
}
