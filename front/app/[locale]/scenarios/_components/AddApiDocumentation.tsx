'use client'

import DrawerDialog from "@/components/shared-components/Card/DrawerDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { toast } from "@/components/ui/use-toast";
import { useApiDocumentations } from "@/app/_hooks/useApiDocumentations";
import { ApiDocumentation } from "@/services";
import _ from "lodash";

const formSchema = z.object({
    name: z.string(),
    url: z.string(),
})

interface IAddApiDocumentation {
    apiDocumentation: ApiDocumentation | null
    setApiDocumentation: Dispatch<SetStateAction<ApiDocumentation | null>>  | null
}

export default function AddApiDocumentation({ apiDocumentation, setApiDocumentation }: IAddApiDocumentation) {
    const { add, update } = useApiDocumentations();
    const [open, setOpen] = useState(false);
    const tApiDocumentation = useTranslations('api_documentations');
    const tErrors = useTranslations('errors');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: apiDocumentation?.name || "",
            url: apiDocumentation?.url || ""
        },
    })

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        const name = values.name;

        if (apiDocumentation) {
            update(apiDocumentation.id ?? '', values)
                .then(() => {
                    toast({
                        title: tApiDocumentation('modification.modification_title'),
                        description: tApiDocumentation('modification.modification_description', { apiDocumentationName: name }),
                    });
                    setOpen(false);
                    if(setApiDocumentation) {
                        setApiDocumentation(null);
                    }
                })
                .catch((error: any) => {
                    toast({
                        title: tApiDocumentation('modification.modification_title'),
                        description: tApiDocumentation('modification.modification_failed_description', { apiDocumentationName: name }),
                    });
                    console.error(tErrors('default') + error);
                });
        } else {
            add(values)
                .then(() => {
                    toast({
                        title: tApiDocumentation('creation.add_title'),
                        description: tApiDocumentation('creation.add_description', { apiDocumentationName: name }),
                    });
                    setOpen(false);
                })
                .catch((error: any) => {
                    toast({
                        title: tApiDocumentation('creation.add_title'),
                        description: tApiDocumentation('creation.add_failed_description', { apiDocumentationName: name }),
                    });
                    console.error(tErrors('default') + error);
                });
        }
    }

    return (
        <section className="w-fit">
            <DrawerDialog
                open={open || !!apiDocumentation}
                setOpen={() => {
                    setOpen(!open);
                    if(setApiDocumentation) {
                        setApiDocumentation(null);
                    }
                }}
                triggerChildren={
                    !apiDocumentation ? (
                        <div className={buttonVariants({ variant: "default" })}>
                            <PlusCircle className="h-4 w-5" />
                            <h1>{tApiDocumentation('creation.add')}</h1>
                        </div>
                    ) : null
                }
                headerTitleChildren={apiDocumentation ? tApiDocumentation('modification.modification') : tApiDocumentation('creation.add')}
                footerChildren={
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{tApiDocumentation("creation.input_name")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={tApiDocumentation('creation.placeholder_input_name')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{tApiDocumentation('creation.input_url')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={tApiDocumentation('creation.placeholder_input_url')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">{apiDocumentation ? tApiDocumentation('modification.modification') : tApiDocumentation('creation.add')}</Button>
                        </form>
                    </Form>
                }
            />
        </section>
    )
};
