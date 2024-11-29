import { StepsAppTyped } from "@/app/_type/Step";
import { ScenarioMetrics, ScenarioMetricsJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead } from "@/services";
import { Log } from "@/services/models/log";

export interface Scenario {
    id: string,
    type: string | undefined,
    name: string
    steps: StepsAppTyped[]
    variables: { [key: string]: string; } | undefined,
    cron: string | undefined | null
    metrics: ScenarioMetricsJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead | undefined | null
}

export interface ScenarioExecution extends Scenario {
    executionId: string
    logs: Log[]
}