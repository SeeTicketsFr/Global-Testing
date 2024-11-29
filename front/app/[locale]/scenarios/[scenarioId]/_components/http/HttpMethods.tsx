import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useStep } from "@/app/_hooks/useStep";
import _ from "lodash";
import { HttpStepMethodEnum } from "@/services";
import { HttpStepAppTyped } from "@/app/_type/Step";


export function HttpMethods() {
  const { currentStep, updateStep, } = useStep();

  function handleChange(value: HttpStepMethodEnum) {
    if (!_.isNull(currentStep)) {
      const updatedStep = { ...currentStep, method: value };
      updateStep(updatedStep);
    }
  }

  return (
    <Select
      onValueChange={handleChange}
      value={(currentStep as HttpStepAppTyped)?.method}
      defaultValue={Object.values(HttpStepMethodEnum)[0]}
    >
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Method" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.values(HttpStepMethodEnum).map((method) => (
            <SelectItem key={method} value={method}>
              {method}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
