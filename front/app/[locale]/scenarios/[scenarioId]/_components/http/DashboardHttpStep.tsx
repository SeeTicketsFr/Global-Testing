import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { HttpMethods } from '@/app/[locale]/scenarios/[scenarioId]/_components/http/HttpMethods';
import { Url } from '@/app/[locale]/scenarios/[scenarioId]/_components/common/Url';
import { Contents } from '@/app/[locale]/scenarios/[scenarioId]/_components/common/Contents';
import { Headers } from '@/app/[locale]/scenarios/[scenarioId]/_components/http/Headers';
import { Treatment } from '@/app/[locale]/scenarios/[scenarioId]/_components/http/Treatment';
import { Variables } from '@/app/[locale]/scenarios/[scenarioId]/_components/common/Variables';
import { CheckConditions } from '@/app/[locale]/scenarios/[scenarioId]/_components/http/CheckConditions';
import { useStep } from '@/app/_hooks/useStep';
import { useTranslations } from 'next-intl';
import _ from 'lodash';
import { HttpStepAppTyped } from '@/app/_type/Step';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabsModern";
import ImportationExplanation from '@/app/[locale]/scenarios/[scenarioId]/_components/common/ImportationExplanation';
import Autocompletion from '@/app/[locale]/scenarios/[scenarioId]/_components/http//Autocompletion';

export function DashboardHttpStep() {
    const tDashboard = useTranslations('step.dashboard');

    const tabs = [
        {
            title: tDashboard('variables'),
            component: Variables,
        },
        {
            title: tDashboard('headers'),
            component: Headers,
        },
        {
            title: tDashboard('content'),
            component: Contents,
        },
        {
            title: tDashboard('check_conditions'),
            component: CheckConditions,
        },
        {
            title: tDashboard('treatments'),
            component: Treatment,
        },
    ]

    const { currentStep, updateStep, } = useStep();

    return (
        <>
            {!_.isNull(currentStep) && (
                <section className="flex flex-col w-full pl-4 gap-4">
                    <section className='flex'>
                        <HttpMethods />
                        <Url />
                    </section>
                    <ImportationExplanation />
                    <Autocompletion />
                    <Tabs defaultValue={tabs[0].title} >
                        <TabsList className="md:w-fit w-full max-w-full flex flex-col md:flex-row gap-3 justify-start flex-wrap">
                            {tabs.map((tab, index) => (
                                <TabsTrigger key={index} value={tab.title}>{tab.title}</TabsTrigger>
                            ))}
                        </TabsList>
                        {tabs.map((tab, index) => (
                            <TabsContent key={index} value={tab.title}>
                                {React.createElement(tab.component, { obj: (currentStep as HttpStepAppTyped), setObj: updateStep })}
                            </TabsContent>
                        ))}
                    </Tabs>
                </section>
            )}
        </>
    )
}
