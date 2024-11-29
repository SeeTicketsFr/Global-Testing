'use client'

import { StepsList } from "./_components/StepsList";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { currentStepAtom, scenarioAtom } from "@/lib/atoms";
import _ from "lodash";
import { CommonDashboardHeader } from "@/app/[locale]/scenarios/[scenarioId]/_components/common/CommonDashboardHeader";
import { DashboardHttpStep } from "@/app/[locale]/scenarios/[scenarioId]/_components/http/DashboardHttpStep";
import { StepTypeEnum } from "@/app/_type/Step";
import { useTranslations } from "next-intl";
import { DashboardLoopStep } from "@/app/[locale]/scenarios/[scenarioId]/_components/loop/DashboardLoopStep";
import { DashboardSleepStep } from "@/app/[locale]/scenarios/[scenarioId]/_components/sleep/DashboardSleepStep";
import { DashboardScenario } from "@/app/[locale]/scenarios/[scenarioId]/_components/scenario/DashboardScenario";
import { useGetScenario } from "@/app/_hooks/useGetScenario";
import { Navbar } from "@/components/shared-components/Navbar/Navbar";
import { DashboardSqsStep } from "./_components/sqs/DashboardSqsStep";

interface ScenarioProps {
  params: {
    scenarioId: string
  }
}

export default function Scenario({params: {scenarioId}}: ScenarioProps) {
  const [scenario] = useAtom(scenarioAtom);
  const [currentStep] = useAtom(currentStepAtom);
  const tErrors = useTranslations('errors');
  const { get } = useGetScenario();
  const tScenario = useTranslations('scenario');

  useEffect(() => {
    const fetchScenarioData = async () => {
      try {
        await get(scenarioId);
      } catch (error) {
        console.error(tErrors('default') + error);
      }
    };

    fetchScenarioData();
  }, [scenarioId, tErrors]);

  return (
    <section className="h-screen w-full">
      <Navbar title={tScenario('scenario')} />
      <section className="h-[94vh] flex flex-col items-center gap-8">
        {scenario !== null && (
          <section className="h-full w-full flex">
            <section className="md:w-1/6 w-2/6 h-full p-4 sticky top-0">
              <StepsList />
            </section>
            <Separator orientation="vertical" className="h-full" />
            <section className="w-full h-full overflow-y-auto">
              <section className="w-full max-h-full">
                <CommonDashboardHeader />
                <Separator />
          
                {!_.isNull(currentStep) ? (
                  <section className="pt-8">
                    {StepTypeEnum.HttpStep === currentStep.type && (
                      <DashboardHttpStep />
                    )}
                    {StepTypeEnum.LoopStep === currentStep.type && (
                      <DashboardLoopStep />
                    )}
                    {StepTypeEnum.SleepStep === currentStep.type && (
                      <DashboardSleepStep />
                    )}
                    {StepTypeEnum.SqsStep === currentStep.type && (
                      <DashboardSqsStep />
                    )}
                  </section>
                ) : (
                  <DashboardScenario />
                )}
              </section>
            </section>
          </section>
        )}
      </section>
    </section>
  );
}