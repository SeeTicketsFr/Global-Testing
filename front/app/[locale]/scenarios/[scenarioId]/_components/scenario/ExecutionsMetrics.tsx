import { ScenarioMetricsJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead } from "@/services"
import { CircleCheck, CircleX } from "lucide-react";
import { useTranslations } from "next-intl";

interface IExecutionsMetrics {
    metrics: ScenarioMetricsJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
}

export default function ExecutionsMetrics({ metrics }: IExecutionsMetrics) {
    const tMetrics = useTranslations('executions.metrics');

    const totalExecutions = metrics.totalExecutions;
    const successExecutions = metrics.successExecutions;
    const failureExecutions = totalExecutions - successExecutions;
    const successRate = totalExecutions > 0 ? (successExecutions / totalExecutions) * 100 : 0;
    const failureRate = totalExecutions > 0 ? (failureExecutions / totalExecutions) * 100 : 0;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">{tMetrics('title')}</h1>
            <section className="flex flex-wrap gap-16 pt-4">
                <section className="flex flex-col gap-2">
                    <p className="text-muted-foreground">{tMetrics('total')}</p>
                    <p className="text-3xl">{totalExecutions}</p>
                </section>
                <section className="flex flex-col gap-2">
                    <p className="text-muted-foreground">{tMetrics('success')}</p>
                    <div className="flex items-center gap-4">
                        <CircleCheck color="#51d271" />
                        <p className="text-3xl">{successExecutions}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">({successRate.toFixed(2)}%)</p>
                </section>
                <section className="flex flex-col gap-2">
                    <p className="text-muted-foreground">{tMetrics('failure')}</p>
                    <div className="flex items-center gap-4">
                        <CircleX color="#d75b5b" />
                        <p className="text-3xl">{failureExecutions}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">({failureRate.toFixed(2)}%)</p>
                </section>
            </section>
        </div>
    )
}
