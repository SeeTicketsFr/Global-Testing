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
import { Webhook, WebhookEventTypeEnum } from "@/services";
import _ from "lodash";
import { useWebhooks } from "@/app/_hooks/useWebhooks";
import { WebhookEventType } from "./WebhookEventType";

const formSchema = z.object({
    eventType: z.nativeEnum(WebhookEventTypeEnum),
    url: z.string(),
})

interface IAddWebhook {
    idScenario: string | undefined | null
    webhook: Webhook | null
    setWebhook: Dispatch<SetStateAction<Webhook | null>>  | null
}

export default function AddWebhook({ idScenario, webhook, setWebhook }: IAddWebhook) {
    const { add, update } = useWebhooks();
    const [open, setOpen] = useState(false);
    const tWebhooks = useTranslations('webhooks');
    const tErrors = useTranslations('errors');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eventType: webhook?.eventType || WebhookEventTypeEnum.on_failure,
            url: webhook?.url || ""
        },
    })

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        if (webhook) {
            update(webhook.id ?? '', values)
                .then(() => {
                    toast({
                        title: tWebhooks('modification.modification_title'),
                    });
                    setOpen(false);
                    if(setWebhook) {
                        setWebhook(null);
                    }
                })
                .catch((error: any) => {
                    toast({
                        title: tWebhooks('modification.modification_title'),
                    });
                    console.error(tErrors('default') + error);
                });
        } else {
            add({ ...values, scenario: "/api/scenarios/" + idScenario })
                .then(() => {
                    toast({
                        title: tWebhooks('creation.add_title'),
                    });
                    setOpen(false);
                })
                .catch((error: any) => {
                    toast({
                        title: tWebhooks('creation.add_title'),
                    });
                    console.error(tErrors('default') + error);
                });
        }
    }

    return (
        <section className="w-fit">
            <DrawerDialog
                open={open || !!webhook}
                setOpen={() => {
                    setOpen(!open);
                    if(setWebhook) {
                        setWebhook(null);
                    }
                }}
                triggerChildren={
                    !webhook ? (
                        <div className={buttonVariants({ variant: "default" })}>
                            <PlusCircle className="h-4 w-5" />
                            <h1>{tWebhooks('creation.add')}</h1>
                        </div>
                    ) : null
                }
                headerTitleChildren={webhook ? tWebhooks('modification.modification') : tWebhooks('creation.add')}
                footerChildren={
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-4">
                            <FormField
                                control={form.control}
                                name="eventType"
                                render={({ field }: any) => (
                                    <FormItem>
                                        <FormLabel>{tWebhooks("creation.input_event_type")}</FormLabel>
                                        <FormControl>
                                            <WebhookEventType field={field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="url"
                                render={({ field }: any) => (
                                    <FormItem>
                                        <FormLabel>{tWebhooks('creation.input_url')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={tWebhooks('creation.placeholder_input_url')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">{webhook ? tWebhooks('modification.modification') : tWebhooks('creation.add')}</Button>
                        </form>
                    </Form>
                }
            />
        </section>
    )
};
