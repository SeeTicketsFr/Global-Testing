import { Scenario } from "@/app/_type/Scenario";
import { StepsAppTyped } from "@/app/_type/Step";
import AutocompleteInput from "@/components/shared-components/Autocomplete/AutocompleteInput";
import NoResource from "@/components/shared-components/NoResource";
import { Button } from "@/components/ui/button";
import _ from 'lodash';
import { PlusCircle, Trash } from "lucide-react";
import { useTranslations } from 'next-intl';
interface VariablesProps {
  obj: StepsAppTyped | Scenario | null;
  setObj: any;
}

export function Variables({ obj, setObj }: VariablesProps) {
  const tVariables = useTranslations('step.variables');

  function handleAddVariable() {
    if (!_.isNull(obj) && !_.isUndefined(obj.variables)) {
      const newVariableKey = '';
      const newObj = { ...obj, variables: { ...obj.variables, [newVariableKey]: '' } };
      setObj(newObj);
    }
  }

  function handleVariableChange(index: number, field: 'name' | 'value', value: string) {
    if (!_.isNull(obj) && !_.isUndefined(obj.variables)) {
      const updatedVariables = Object.entries(obj.variables);
      if (field === 'name') {
        updatedVariables[index][0] = value;
      } else if (field === 'value') {
        updatedVariables[index][1] = value;
      }
      const newVariables = Object.fromEntries(updatedVariables);
      const updatedObj = { ...obj, variables: newVariables };
      setObj(updatedObj);
    }
  }

  function handleDeleteVariable(index: number) {
    if (!_.isNull(obj) && !_.isUndefined(obj.variables)) {
      const updatedVariables = { ...obj.variables };
      const keys = Object.keys(updatedVariables);
      const key = keys[index];
      delete updatedVariables[key];
      const updatedObj = { ...obj, variables: updatedVariables };
      setObj(updatedObj);
    }
  }

  return (
    <section className="w-full space-y-[0.5em]">
      <section className="flex w-full justify-center">
        <Button variant="default" onClick={handleAddVariable}>
          <PlusCircle className="h-4 w-5" />
          <h1>{tVariables('add')}</h1>
        </Button>
      </section>
      {!_.isUndefined(obj?.variables) && Object.keys(obj.variables).length > 0 ? (
        Object.entries(obj.variables).map(([key, value], index) => (
          <section key={index} className="w-full flex items-center">
            <AutocompleteInput
              className="focus-visible:ring-0 flex-grow-[4.5]"
              value={key}
              placeholder={tVariables('key')}
              onChange={(e: string) => handleVariableChange(index, 'name', e)}
            />
            <AutocompleteInput
              className="focus-visible:ring-0 flex-grow-[4.5]"
              value={value}
              placeholder={tVariables('value')}
              onChange={(e: string) => handleVariableChange(index, 'value', e)}
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDeleteVariable(index)}
              className="flex-grow-1 flex-shrink-0"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </section>
        ))
      ) : (
        <NoResource text={tVariables('no_variable')} />
      )}
    </section>
  );
}
