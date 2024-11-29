'use client'

import DrawerDialog from "@/components/shared-components/Card/DrawerDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import {
    Form,
    FormControl,
    FormDescription,
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
import { addScenario } from "@/app/_store/Scenarios";
import { useRouter } from 'next/navigation';
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
    name: z.string(),
})

export default function AddScenario() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        },
    })
    const tScenario = useTranslations('scenario');
    const tErrors = useTranslations('errors');

    function onSubmit(values: z.infer<typeof formSchema>) {
        const name = values.name;
    
        addScenario({name})
            .then(() => {
                toast({
                    title: tScenario('add_title'),
                    description: tScenario('add_description', { scenarioName: name }),
                });
                setOpen(false);
                return router.refresh();
            })
            .catch((error) => {
                toast({
                    title: tScenario('add_title'),
                    description: tScenario('add_failed_description', { scenarioName: name }),
                });
                console.error(tErrors('default') + error);
            });
    }
    

    return (
        <section className="w-fit">
            <DrawerDialog
                open={open}
                setOpen={setOpen}
                triggerChildren={
                    <div className={buttonVariants({ variant: "default" })}>
                        <PlusCircle className="h-4 w-5" />
                        <h1>{tScenario('add')}</h1>
                    </div>
                }
                headerTitleChildren={tScenario('add')}
                footerChildren={
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{tScenario("input_name")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={tScenario('input_add')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">{tScenario('add')}</Button>
                        </form>
                    </Form>
                }
            />
        </section>
    )
};