import { StepsAppTyped } from "@/app/_type/Step";
import { ScenarioMetrics, ScenarioMetricsJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsReadWebhookRead } from "@/services";
import { Log } from "@/services/models/log";

export interface Scenario {
    id: string,
    type: string | undefined,
    name: string
    steps: StepsAppTyped[]
    variables: { [key: string]: string; } | undefined,
    cron: string | undefined | null
    metrics: ScenarioMetricsJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsReadWebhookRead | undefined | null
}

export interface ScenarioExecution extends Scenario {
    executionId: string
    logs: Log[]
}