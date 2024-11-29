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
import { useApiDocumentations } from '@/app/_hooks/useApiDocumentations';
import _ from 'lodash';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IApiDocumentationMethodCombobox {
    path: any,
    method: string|null
    onSelect: any
}

export default function ApiDocumentationMethodCombobox({ path, method, onSelect }: IApiDocumentationMethodCombobox) {
    const [open, setOpen] = useState(false);
    const methods = path ? Object.keys(path[Object.keys(path)[0]]) : null;
    const tAutocompletion = useTranslations('api_documentations.autocompletion.form.method');

    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {!_.isNull(method)
                        ? method
                        : tAutocompletion('trigger')}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
                <Command>
                    <CommandInput placeholder={tAutocompletion('search')} />
                    <CommandList>
                        <CommandGroup heading={tAutocompletion('group')}>
                            {
                                (!_.isNull(methods) && methods.length > 0)
                                && (methods.map((method: string) => (
                                    <CommandItem
                                        key={method}
                                        value={method}
                                        onSelect={() => onSelect(method)}
                                    >
                                        {method}
                                    </CommandItem>
                                )))
                            }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
