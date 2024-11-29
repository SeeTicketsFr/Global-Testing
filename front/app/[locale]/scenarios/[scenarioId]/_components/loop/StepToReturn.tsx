"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useStep } from "@/app/_hooks/useStep"
import { scenarioAtom } from "@/lib/atoms"
import { useAtom } from "jotai"
import _ from "lodash"
import { LoopStepAppTyped } from "@/app/_type/Step"
import { useTranslations } from "next-intl"

export function StepToReturn() {
    const [open, setOpen] = React.useState(false)
    const [scenario] = useAtom(scenarioAtom);
    const { currentStep, updateStep, } = useStep();
    const [value, setValue] = React.useState('')
    const tStepToReturn = useTranslations('step.stepToReturn');

    function handleChangeStepToReturn(stepToReturn: number) {
        if (!_.isNull(currentStep)) {
            const updatedStep = { ...currentStep, stepToReturn: stepToReturn };
            updateStep(updatedStep);
          }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-64 justify-between"
                >
                {(currentStep as LoopStepAppTyped).stepToReturn
                    ? scenario.steps.find((step) => step.stepNumber === (currentStep as LoopStepAppTyped).stepToReturn/* `${step.stepNumber.toString()} - ${step.name}` === value */)?.name
                    : tStepToReturn('select')}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
                <Command>
                <CommandInput placeholder={tStepToReturn('search')} />
                <CommandList>
                    <CommandEmpty>{tStepToReturn('search')}</CommandEmpty>
                    <CommandGroup>
                    {scenario.steps.map((step) => (
                        <CommandItem
                        key={step.stepNumber}
                        value={`${step.stepNumber} - ${step.name}`}
                        onSelect={(currentValue) => {
                            handleChangeStepToReturn(step.stepNumber);
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                        }}
                        >
                        <Check
                            className={cn(
                            "mr-2 h-4 w-4",
                            value === step.name ? "opacity-100" : "opacity-0"
                            )}
                        />
                        {step.stepNumber} - {step.name}
                        </CommandItem>
                    ))}
                    </CommandGroup>
                </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
