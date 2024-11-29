import { useStep } from '@/app/_hooks/useStep';
import { LoopStepAppTyped } from '@/app/_type/Step';
import { Button } from "@/components/ui/button";
import _ from 'lodash';
import { PlusCircle, Trash } from "lucide-react";
import { useTranslations } from 'next-intl';
import AutocompleteInput from '@/components/shared-components/Autocomplete/AutocompleteInput';
import { Condition as ConditionType } from '@/services';
import NoResource from '@/components/shared-components/NoResource';

export function Conditions() {
  const { currentStep, updateStep } = useStep();
  const { conditions } = currentStep as LoopStepAppTyped & { conditions?: ConditionType[] };
  const tConditions = useTranslations('step.loop_conditions');


  function handleAddConditions() {
    const newCondition: ConditionType = { dynamicValue: '', value: '', defaultValue: '' };
    if (!_.isNull(currentStep)) {
      const updatedConditions = conditions ? [...conditions, newCondition] : [newCondition];
      const newStep = { ...currentStep, conditions: updatedConditions };
      updateStep(newStep);
    }
  }

  function handleConditionsChange(index: number, field: string, value: string) {
    if (!_.isNull(currentStep) && conditions) {
      const updatedConditions = conditions.map((t, i) => {
        if (i === index) {
          return { ...t, [field]: value };
        }
        return t;
      });

      const updatedStep = { ...currentStep, conditions: updatedConditions };
      updateStep(updatedStep);
    }
  }

  function handleDeleteConditions(index: number) {
    if (!_.isNull(currentStep) && conditions) {
      const updatedConditions = conditions.filter((_, i) => i !== index);
      const updatedStep = { ...currentStep, conditions: updatedConditions };
      updateStep(updatedStep);
    }
  }

  return (
    <section className="w-full space-y-[0.5em]">
      <section className="flex w-full justify-center">
        <Button variant="default" onClick={handleAddConditions}>
          <PlusCircle className="h-4 w-5" />
          <h1>{tConditions('add')}</h1>
        </Button>
      </section>
      {conditions && Array.isArray(conditions) && conditions.length > 0 ? (
        conditions.map((item, index) => (
          <section key={index} className="w-full flex flex-col space-y-2">
            <div className="flex w-full">
              <AutocompleteInput
                className="focus-visible:ring-0 flex-grow-[3]"
                value={item.dynamicValue}
                placeholder={tConditions('variable_name')}
                onChange={(e: string) => handleConditionsChange(index, 'dynamicValue', e)}
              />
              <AutocompleteInput
                className="focus-visible:ring-0 flex-grow-[3]"
                value={item.value}
                placeholder={tConditions('value')}
                onChange={(e: string) => handleConditionsChange(index, 'value', e)}
              />
              <AutocompleteInput
                className="focus-visible:ring-0 flex-grow-[3]"
                value={item.defaultValue}
                placeholder={tConditions('default_value')}
                onChange={(e: string) => handleConditionsChange(index, 'defaultValue', e)}
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteConditions(index)}
                className="flex-grow-1 flex-shrink-0"
              >
                <Trash className="h-4 w-4" />
            </Button>
            </div>
          </section>
        ))
      ) : (
        <NoResource text={tConditions('no_condition')} />
      )}
    </section>
  );
}