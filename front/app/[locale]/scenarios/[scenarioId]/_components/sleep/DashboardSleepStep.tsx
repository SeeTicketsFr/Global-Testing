import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Variables } from '@/app/[locale]/scenarios/[scenarioId]/_components/common/Variables';
import { Duration } from '@/app/[locale]/scenarios/[scenarioId]/_components/sleep/Duration';
import { useStep } from '@/app/_hooks/useStep';
import { useTranslations } from 'next-intl';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabsModern";
import { SleepStepAppTyped } from '@/app/_type/Step';
import ImportationExplanation from '../common/ImportationExplanation';

export function DashboardSleepStep() {
    const tDashboard = useTranslations('step.dashboard');

    const tabs = [
        {
            title: tDashboard('variables'),
            component: Variables,
        },
    ]

    const [tabSelected, setTabSelected] = useState<number>(0)
    const { currentStep, updateStep, } = useStep();

    return (
      <section className="flex flex-col w-full pl-4 gap-4">
        <Duration />
        <ImportationExplanation />

        <Tabs defaultValue={tabs[0].title} >
            <TabsList className="md:w-fit w-full max-w-full flex flex-col md:flex-row gap-3 justify-start flex-wrap">
                {tabs.map((tab, index) => (
                    <TabsTrigger key={index} value={tab.title}>{tab.title}</TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab, index) => (
                <TabsContent key={index} value={tab.title}>
                    {React.createElement(tab.component, { obj: (currentStep as SleepStepAppTyped), setObj: updateStep })}
                </TabsContent>
            ))}
        </Tabs>
      </section>
    )
}
