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
import { toast } from "@/components/ui/use-toast";
import { StepType } from "@/app/[locale]/scenarios/[scenarioId]/_components/StepType";
import { StepTypeEnum } from '@/app/_type/Step' 
import { addHttpStep } from "@/app/_store/HttpStep";
import { Switch } from "@/components/ui/switch";
import { HttpStepJsonld, LoopStepJsonld, SleepStepJsonld, SqsStepJsonld } from "@/services";
import { addLoopStep } from "@/app/_store/LoopStep";
import { addSleepStep } from "@/app/_store/SleepStep";
import { addSqsStep } from "@/app/_store/SqsStep";

const formSchema = z.object({
    name: z.string(),
    type: z.nativeEnum(StepTypeEnum),
    runAfterFailure: z.boolean().default(false),
})

interface AddStepProps {
    scenarioId: string,
    stepsNumber: number,
}

export default function AddStep(props: AddStepProps) {
    const { scenarioId, stepsNumber } = props; 
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: StepTypeEnum.HttpStep,
            runAfterFailure: false,
        },
    })
    const tStep = useTranslations('step');
    const tErrors = useTranslations('errors');

    function handleCreationWorked(stepName: string) {
        toast({
            title: tStep('add_title'),
            description: tStep('add_description', { stepName }),
        });
        setOpen(false);
        location.reload();
    }

    function handleCreationFailed(stepName: string) {
        toast({
            title: tStep('add_title'),
            description: tStep('add_failed_description', { stepName }),
        });
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        var stepValues = {
            name: values.name,
            scenario: scenarioId,
            stepNumber: stepsNumber + 1,
            runAfterFailure: values.runAfterFailure
        }
        const type = values.type;

        switch (type) {
            case StepTypeEnum.HttpStep:
                const httpStepJsonld: HttpStepJsonld = {
                    ...stepValues,
                    method: "GET",
                    url: `${process.env.NEXT_PUBLIC_API_PUBLIC_URL}/api/http_steps`,
                };

                addHttpStep(httpStepJsonld)
                    .then(() => {
                        handleCreationWorked(values.name);
                    })
                    .catch((error) => {
                        handleCreationFailed(values.name);
                        console.error(tErrors('default') + error);
                    });
                break;
            
            case StepTypeEnum.LoopStep:
                const loopStepJsonld: LoopStepJsonld = {
                    ...stepValues,
                    stepToReturn: 1,
                }

                addLoopStep(loopStepJsonld)
                    .then(() => {
                        handleCreationWorked(values.name);
                    })
                    .catch((error) => {
                        handleCreationFailed(values.name);
                        console.error(tErrors('default') + error);
                    });
                break;
            
            case StepTypeEnum.SleepStep:
                const sleepStepJsonld: SleepStepJsonld = {
                    ...stepValues,
                    duration: 1000,
                }

                addSleepStep(sleepStepJsonld)
                    .then(() => {
                        handleCreationWorked(values.name);
                    })
                    .catch((error) => {
                        handleCreationFailed(values.name);
                        console.error(tErrors('default') + error);
                    });
                break;

            case StepTypeEnum.SqsStep:
                const sqsStepJsonld: SqsStepJsonld = {
                    ...stepValues,
                    url: 'https://sqs.us-east-2.amazonaws.com/123456789012/MyQueue',
                    region: 'us-east-2',
                    accessKey: '',
                    secretKey: '',
                    messageGroupId: '',
                    content: {}
                }

                addSqsStep(sqsStepJsonld)
                    .then(() => {
                        handleCreationWorked(values.name);
                    })
                    .catch((error) => {
                        handleCreationFailed(values.name);
                        console.error(tErrors('default') + error);
                    });
                break;

            default:
                break;
        }
    }

    return (
        <section className="w-fit">
            <DrawerDialog
                open={open}
                setOpen={setOpen}
                triggerChildren={
                    <div className={`space-x-1 ${buttonVariants({ variant: "default" })}`}>
                        <PlusCircle  />
                        <h1 className="text-sm">{tStep('add')}</h1>
                    </div>
                }
                headerTitleChildren={tStep('add')}
                footerChildren={
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
                            <section className="flex justify-center items-center gap-2">
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <StepType StepTypeEnum={StepTypeEnum} field={field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder={tStep('input_add')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </section>
                            <FormField
                                control={form.control}
                                name="runAfterFailure"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel>
                                            {tStep('runAfterFailure.title')}
                                        </FormLabel>
                                        <FormDescription>
                                            {tStep('runAfterFailure.description')}
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    </FormItem>
                                )}
                                />
                            <Button type="submit">{tStep('add')}</Button>
                        </form>
                    </Form>
                }
            />
        </section>
    )
};