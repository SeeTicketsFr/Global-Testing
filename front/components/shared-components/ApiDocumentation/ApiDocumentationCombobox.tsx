import React, { useState, useEffect } from 'react';
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
import { ApiDocumentation } from '@/services';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IApiDocumentationCombobox {
    onSelect: any
}

export default function ApiDocumentationCombobox({ onSelect }: IApiDocumentationCombobox) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { apiDocumentations, getAll, currentApiDocumentationFile } = useApiDocumentations();
    const tAutocompletion = useTranslations('api_documentations.autocompletion.form.documentation');

    useEffect(() => {
        if(open) {
            getAll(1, 100);
        }
    }, [open]);

    const handleSelect = async (apiDocumentation: ApiDocumentation) => {
        setLoading(true);
        await onSelect(apiDocumentation);
        setLoading(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {loading ? (
                        <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                        currentApiDocumentationFile
                            ? apiDocumentations.find((apiDocumentation) => apiDocumentation.id === currentApiDocumentationFile.id)?.name
                            : tAutocompletion("trigger")
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
                <Command>
                    <CommandInput placeholder={tAutocompletion("trigger")} />
                    <CommandList>
                        <CommandGroup heading={tAutocompletion("group")}>
                            {
                                (apiDocumentations.length > 0)
                                && (apiDocumentations.map((apiDocumentation: ApiDocumentation) => (
                                    <CommandItem
                                        key={apiDocumentation.id}
                                        value={apiDocumentation.name}
                                        onSelect={() => handleSelect(apiDocumentation)}
                                    >
                                        {apiDocumentation.name}
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
