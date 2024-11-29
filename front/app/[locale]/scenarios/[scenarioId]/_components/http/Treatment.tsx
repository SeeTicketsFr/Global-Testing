import { useEffect, useState } from 'react';
import { useStep } from '@/app/_hooks/useStep';
import { HttpStepAppTyped } from '@/app/_type/Step';
import { Button } from "@/components/ui/button";
import _ from 'lodash';
import { PlusCircle, Trash } from "lucide-react";
import { useTranslations } from 'next-intl';
import AutocompleteInput from '@/components/shared-components/Autocomplete/AutocompleteInput';
import AutocompleteTextArea from '@/components/shared-components/Autocomplete/AutocompleteTextArea';
import { Treatment as TreatmentType } from '@/services';
import NoResource from '@/components/shared-components/NoResource';

export function Treatment() {
  const { currentStep, updateStep } = useStep();
  const { treatment } = currentStep as HttpStepAppTyped & { treatment?: TreatmentType[] };
  const tTreatment = useTranslations('step.treatment');

  const [jsonView, setJsonView] = useState<string[]>([]);
  const [isValid, setIsValid] = useState<boolean[]>([]);

  useEffect(() => {
    if (treatment) {
      const initialJsonViews = treatment.map(t => JSON.stringify(t.conditions, null, 2));
      setJsonView(initialJsonViews);
      const initialIsValid = treatment.map(() => true);
      setIsValid(initialIsValid);
    } else {
      setJsonView([]);
      setIsValid([]);
    }
  }, [treatment]);

  function handleAddTreatment() {
    const newTreatment: TreatmentType = { variableName: '', contentLocation: '', conditions: {} };
    if (!_.isNull(currentStep)) {
      const updatedTreatment = treatment ? [...treatment, newTreatment] : [newTreatment];
      const newStep = { ...currentStep, treatment: updatedTreatment };
      updateStep(newStep);
    }
  }

  function handleTreatmentChange(index: number, field: string, value: string) {
    if (!_.isNull(currentStep) && treatment) {
      const updatedTreatment = treatment.map((t, i) => {
        if (i === index) {
          return { ...t, [field]: value };
        }
        return t;
      });

      const updatedStep = { ...currentStep, treatment: updatedTreatment };
      updateStep(updatedStep);
    }
  }

  function handleJsonChange(index: number, jsonString: string) {
    setJsonView(prev => {
      const newJsonView = [...prev];
      newJsonView[index] = jsonString;
      return newJsonView;
    });

    if (treatment) {
      try {
        const parsedConditions = JSON.parse(jsonString);
        const updatedTreatment = treatment.map((t, i) => {
          if (i === index) {
            return { ...t, conditions: parsedConditions };
          }
          return t;
        });

        const updatedStep = { ...currentStep, treatment: updatedTreatment } as HttpStepAppTyped;
        updateStep(updatedStep);

        setIsValid(prev => {
          const newIsValid = [...prev];
          newIsValid[index] = true;
          return newIsValid;
        });
      } catch (error) {
        setIsValid(prev => {
          const newIsValid = [...prev];
          newIsValid[index] = false;
          return newIsValid;
        });
      }
    }
  }

  function handleDeleteTreatment(index: number) {
    if (!_.isNull(currentStep) && treatment) {
      const updatedTreatment = treatment.filter((_, i) => i !== index);
      const updatedStep = { ...currentStep, treatment: updatedTreatment };
      updateStep(updatedStep);
    }
  }

  return (
    <section className="w-full space-y-[0.5em]">
      <section className="flex w-full justify-center">
        <Button variant="default" onClick={handleAddTreatment}>
          <PlusCircle className="h-4 w-5" />
          <h1>{tTreatment('add')}</h1>
        </Button>
      </section>
      {treatment && Array.isArray(treatment) && treatment.length > 0 ? (
        treatment.map((item, index) => (
          <section key={index} className="w-full flex flex-col space-y-2">
            <div className="flex w-full">
              <AutocompleteInput
                className="focus-visible:ring-0 flex-grow-[3]"
                value={item.variableName}
                placeholder={tTreatment('variable_name')}
                onChange={(e: string) => handleTreatmentChange(index, 'variableName', e)}
              />
              <AutocompleteInput
                className="focus-visible:ring-0 flex-grow-[3]"
                value={item.contentLocation}
                placeholder={tTreatment('content_location')}
                onChange={(e: string) => handleTreatmentChange(index, 'contentLocation', e)}
              />
            </div>
            <AutocompleteTextArea
              className="h-40"
              value={jsonView[index]}
              onChange={(e: string) => handleJsonChange(index, e)}
              placeholder={tTreatment('write_json')}
            />
            {isValid[index] ? (
              <h1 className="text-sm text-green-500">{tTreatment('valid')}</h1>
            ) : (
              <h1 className="text-sm text-red-500">{tTreatment('invalid')}</h1>
            )}
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDeleteTreatment(index)}
              className="flex-grow-1 flex-shrink-0"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </section>
        ))
      ) : (
        <NoResource text={tTreatment('no_treatment')} />
      )}
    </section>
  );
}