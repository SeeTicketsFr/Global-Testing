import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useAtom } from 'jotai';
import { scenarioAtom } from '@/lib/atoms';
import _ from 'lodash';
import { StepTypeEnum, StepsAppTyped } from '@/app/_type/Step';
import { OperatorsEnum } from '@/app/_type/Variable';

export default function AutocompleteInput({ value, onChange, placeholder }: any) {
    const [scenario] = useAtom(scenarioAtom);
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState<number>(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setPosition(event.target.selectionStart ?? 0);
        onChange(inputValue);
        setOpen((inputValue.slice(position - 1, position + 1)) === '<<');
    };

    const onSelect = (selectedValue: string) => {
        if (position >= 2) {
            const newValue = value.slice(0, position - 2) + `<<${selectedValue}>>` + value.slice(position);
            onChange(newValue);
            setOpen(false);
        }
    };

    
    return (
        <div className='flex flex-col w-full h-full'>
            <Input placeholder={placeholder} value={value} onChange={handleChange} />

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger></PopoverTrigger>
                <PopoverContent className="w-64 p-0">
                    <Command>
                        <CommandInput placeholder='Search...' />
                        <CommandList>
                            <CommandGroup heading="Variables">
                                {scenario.variables && Object.keys(scenario.variables).map((key, index) => 
                                    <CommandItem
                                        key={index} 
                                        value={`v:scenario:${key} or 'default value'`}
                                        onSelect={() => onSelect(`v:scenario:${key} or 'default value'`)}
                                    >
                                        {`v:scenario:${key}`}
                                    </CommandItem>
                                )}
                                {scenario.steps.map((step: StepsAppTyped) => (
                                    <div key={step.id}>
                                        
                                        {step.variables && Object.keys(step.variables).map((key, index) => 
                                            <CommandItem
                                                key={index}
                                                value={`v:steps[${step.stepNumber}]:${key} or 'default value'`}
                                                onSelect={() => onSelect(`v:steps[${step.stepNumber}]:${key} or 'default value'`)}
                                            >
                                                {`v:steps[${step.stepNumber}]:${key}`}
                                            </CommandItem>
                                        )}
                                    </div>
                                ))}
                            </CommandGroup>
                            <CommandGroup heading="Response">
                                {scenario.steps.map((step: StepsAppTyped) => {
                                    if(StepTypeEnum.HttpStep === step.type) {
                                        return (
                                            <CommandItem
                                                key={step.id}
                                                value={`r:steps[${step.stepNumber}]:location or 'default value'`}
                                                onSelect={() => onSelect(`r:steps[${step.stepNumber}]:location or 'default value'`)}
                                            >
                                                {`r:steps[${step.stepNumber}]:location`}
                                            </CommandItem>
                                        )}
                                    })}
                                </CommandGroup>
                                <CommandGroup heading="Date">
                                    <CommandItem
                                        value={`now:default`}
                                        onSelect={() => onSelect(`now:default`)}
                                        >
                                        now
                                    </CommandItem>
                                    <CommandItem
                                        value={`now:Europe/Paris,Y-m-d`}
                                        onSelect={() => onSelect(`now:Europe/Paris,Y-m-d`)}
                                        >
                                        now:customFormat
                                    </CommandItem>
                                </CommandGroup>
                                <CommandGroup heading="Generate fake information">
                                    <CommandItem
                                        value={`f:method`}
                                        onSelect={() => onSelect(`f:method`)}
                                        >
                                        fake name or email or uuid, etc.
                                    </CommandItem>
                                </CommandGroup>
                                <CommandGroup heading="Arithmetic operation">
                                    {Object.entries(OperatorsEnum).map(([key, value]) => {
                                        return (
                                            <CommandItem
                                            key={key}
                                            value={`o:${value}:1:-1`}
                                            onSelect={() => onSelect(`o:${value}:1:-1`)}
                                            >
                                                {key}
                                            </CommandItem>
                                        );
                                    })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
