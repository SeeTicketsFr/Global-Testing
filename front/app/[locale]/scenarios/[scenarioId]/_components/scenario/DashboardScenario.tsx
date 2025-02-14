import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Variables } from '@/app/[locale]/scenarios/[scenarioId]/_components/common/Variables';
import { useAtom } from 'jotai';
import { scenarioAtom } from '@/lib/atoms';
import { Scheduler } from '@/app/[locale]/scenarios/[scenarioId]/_components/scenario/Scheduler';
import { Executions } from '@/app/[locale]/scenarios/[scenarioId]/_components/scenario/Executions';
import { useTranslations } from 'next-intl';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabsModern";
import Webhooks from './Webhooks';

export function DashboardScenario() {
    const tDashboard = useTranslations('step.dashboard');

    const tabs = [
        {
            title: tDashboard('variables'),
            component: Variables,
        },
        {
            title: tDashboard('scheduler'),
            component: Scheduler,
        },
        {
            title: tDashboard('webhooks'),
            component: Webhooks
        },
        {
            title: tDashboard('executions'),
            component: Executions
        }
    ]

    const [scenario, setScenario] = useAtom(scenarioAtom);

    return (
      <section className="flex flex-col w-full p-4 gap-4">
        <Tabs defaultValue={tabs[0].title} >
            <TabsList className="md:w-fit w-full max-w-full flex flex-col md:flex-row gap-3 justify-start flex-wrap">
                {tabs.map((tab, index) => (
                    <TabsTrigger key={index} value={tab.title}>{tab.title}</TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab, index) => (
                <TabsContent key={index} value={tab.title}>
                    {React.createElement(tab.component, { obj: scenario, setObj: setScenario })}
                </TabsContent>
            ))}
        </Tabs>
      </section>
    )
}
