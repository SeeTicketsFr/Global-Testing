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

interface IApiDocumentationPathCombobox {
    path: string|null,
    onSelect: any
}

export default function ApiDocumentationPathCombobox({ path, onSelect }: IApiDocumentationPathCombobox) {
    const [open, setOpen] = useState(false);
    const { currentApiDocumentationFile } = useApiDocumentations();
    const file = currentApiDocumentationFile?.file.data;
    const paths = file?.paths;
    const tAutocompletion = useTranslations('api_documentations.autocompletion.form.path');

    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {!_.isNull(path)
                        ? Object.keys(paths).find((pathItem: string) => pathItem === Object.keys(path)[0])
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
                                (!_.isUndefined(paths) && Object.keys(paths).length > 0)
                                && (Object.keys(paths).map((pathKey: string) => (
                                    <CommandItem
                                        key={pathKey}
                                        value={pathKey}
                                        onSelect={() => onSelect({ [pathKey]: paths[pathKey] })}
                                    >
                                        {pathKey}
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
