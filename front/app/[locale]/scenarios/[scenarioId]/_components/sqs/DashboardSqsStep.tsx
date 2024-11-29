import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Url } from '@/app/[locale]/scenarios/[scenarioId]/_components/common/Url';
import { Variables } from '@/app/[locale]/scenarios/[scenarioId]/_components/common/Variables';
import { useStep } from '@/app/_hooks/useStep';
import { useTranslations } from 'next-intl';
import { SqsStepAppTyped } from '@/app/_type/Step';
import { Contents } from '@/app/[locale]/scenarios/[scenarioId]/_components/common/Contents';
import { Region } from '@/app/[locale]/scenarios/[scenarioId]/_components/sqs/Region';
import _ from 'lodash';
import { AccessKey } from './AccessKey';
import { SecretKey } from './SecretKey';
import { MessageGroupId } from './MessageGroupId';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabsModern";
import ImportationExplanation from '../common/ImportationExplanation';

export function DashboardSqsStep() {
    const tDashboard = useTranslations('step.dashboard');

    const tabs = [
        {
            title: tDashboard('variables'),
            component: Variables,
        },
        {
            title: tDashboard('content'),
            component: Contents,
        },
    ]

    const [tabSelected, setTabSelected] = useState<number>(0)
    const { currentStep, updateStep, } = useStep();

    return (
      <section className="flex flex-col w-full p-4 gap-4">
        <section className='flex'>
            <Url />
        </section>
        <section className='w-full flex flex-col md:flex-row justify-center gap-2'>
            <Region />
            <AccessKey />
            <SecretKey />
            <MessageGroupId />
        </section>
        <ImportationExplanation />
        <Tabs defaultValue={tabs[0].title} >
            <TabsList className="md:w-fit w-full max-w-full flex flex-col md:flex-row gap-3 justify-start flex-wrap">
                {tabs.map((tab, index) => (
                    <TabsTrigger key={index} value={tab.title}>{tab.title}</TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab, index) => (
                <TabsContent key={index} value={tab.title}>
                    {React.createElement(tab.component, { obj: (currentStep as SqsStepAppTyped), setObj: updateStep })}
                </TabsContent>
            ))}
        </Tabs>
      </section>
    )
}
