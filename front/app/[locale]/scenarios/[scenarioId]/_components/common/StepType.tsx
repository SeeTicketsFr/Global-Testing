import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import _ from "lodash";
import { StepTypeEnum } from "@/app/_type/Step";
import { useAtom } from "jotai";
import { currentStepAtom } from "@/lib/atoms";


export function StepType() {
  const [currentStep] = useAtom(currentStepAtom);

  return (
    <Select
      value={currentStep?.type}
      defaultValue={Object.values(StepTypeEnum)[0]}
    >
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Method" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            <SelectItem value={currentStep?.type ?? Object.values(StepTypeEnum)[0]}>
              {currentStep?.type}
            </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
