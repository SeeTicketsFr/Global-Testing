"use client"

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Trash, Pen } from "lucide-react";
import { DialogConfirmation } from "@/components/shared-components/Card/DialogConfirmation";
import { useTranslations } from "next-intl";
import { deleteScenario } from "@/app/_store/Scenarios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl"
import type { Locale } from "@/lib/locales";
import { Scenario as ScenarioType } from "@/app/_type/Scenario";
import ScenarioExecution from "@/components/shared-components/Logs/ScenarioExecution";
import _ from "lodash";

export default function Scenario(props: ScenarioType) {
    const { id, name, variables, steps } = props;
    const tScenario = useTranslations('scenario');
    const tConfirmation = useTranslations('scenario.confirmation');
    const tErrors = useTranslations('errors');
    const router = useRouter();
    const locale = useLocale() as Locale;

    const handleDelete = () => {    
        deleteScenario({id})
            .then(() => {
                toast({
                    title: tScenario('deleteTitle'),
                    description: tScenario('deleteDescription', { scenarioName: name }),
                });

                return router.refresh();
            })
            .catch((error) => {
                console.error(tErrors('default') + error);
            });
    }

    return (
        <Card className="w-fit">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{tScenario('description', { stepsCount: steps.length })}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
                <section className="flex gap-1 justify-center items-center">
                    <Button variant="outline" size="icon" onClick={() =>  router.push(`/${locale}/scenarios/${id}`)}>
                        <Pen className="h-4 w-4" />
                    </Button>
                    <DialogConfirmation
                        translationPath='scenario'
                        description={tConfirmation('confirmationDeleteDescription')}
                        handleSubmit={() => handleDelete()}
                        triggerChildren={
                            <div className={buttonVariants({ variant: "destructive", size: "icon" })}>
                                <Trash className="h-4 w-4" />
                            </div>
                        }
                    />

                </section>
                <ScenarioExecution {...props} />
            </CardFooter>
        </Card>
    );
}