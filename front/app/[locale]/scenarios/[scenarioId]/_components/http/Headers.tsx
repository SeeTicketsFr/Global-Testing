import { useStep } from "@/app/_hooks/useStep";
import { HttpStepAppTyped } from "@/app/_type/Step";
import AutocompleteInput from "@/components/shared-components/Autocomplete/AutocompleteInput";
import NoResource from "@/components/shared-components/NoResource";
import { Button } from "@/components/ui/button";
import _ from 'lodash';
import { PlusCircle, Trash } from "lucide-react";
import { useTranslations } from 'next-intl';


export function Headers() {
  const { currentStep, updateStep, } = useStep();
  const { headers } = currentStep as HttpStepAppTyped;
  const tHeaders = useTranslations('step.headers');

  function handleAddHeader() {
    if (!_.isNull(currentStep) && !_.isUndefined(headers)) {
      const newHeaderKey = '';
      const newObj = { ...currentStep, headers: { ...headers, [newHeaderKey]: '' } };
      updateStep(newObj);
    }
  }

  function handleHeaderChange(index: number, field: 'name' | 'value', value: string) {
    if (!_.isNull(currentStep) && !_.isUndefined(headers)) {
      const updatedHeaders = Object.entries(headers);

      if (field === 'name') {
        const [, oldValue] = updatedHeaders[index];
        updatedHeaders[index] = [value, oldValue];
      } else if (field === 'value') {
        const [key] = updatedHeaders[index];
        updatedHeaders[index] = [key, value];
      }

      const newHeaders = Object.fromEntries(updatedHeaders);
      const updatedObj = { ...currentStep, headers: newHeaders };
      updateStep(updatedObj);
    }
  }

  function handleDeleteHeader(index: number) {
    if (!_.isNull(currentStep) && !_.isUndefined(headers)) {
      const updatedHeaders = { ...headers };
      const keys = Object.keys(updatedHeaders);
      const key = keys[index];
      delete updatedHeaders[key];
      const updatedObj = { ...currentStep, headers: updatedHeaders };
      updateStep(updatedObj);
    }
  }

  return (
    <section className="w-full space-y-[0.5em]">
      <section className="flex w-full justify-center">
        <Button variant="default" onClick={handleAddHeader}>
          <PlusCircle className="h-4 w-5" />
          <h1>{tHeaders('add')}</h1>
        </Button>
      </section>
      {!_.isUndefined(headers) && Object.keys(headers).length > 0 ? (
        Object.entries(headers).map(([key, value], index) => (
          <section key={index} className="w-full flex items-center">
            <AutocompleteInput
              className="focus-visible:ring-0 flex-grow-[4.5]"
              value={key}
              placeholder={tHeaders('key')}
              onChange={(e: string) => handleHeaderChange(index, 'name', e)}
            />
            <AutocompleteInput
              className="focus-visible:ring-0 flex-grow-[4.5]"
              value={value}
              placeholder={tHeaders('value')}
              onChange={(e: string) => handleHeaderChange(index, 'value', e)}
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDeleteHeader(index)}
              className="flex-grow-1 flex-shrink-0"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </section>
        ))
      ) : (
        <NoResource text={tHeaders('no_header')} />
      )}
    </section>
  );
}
