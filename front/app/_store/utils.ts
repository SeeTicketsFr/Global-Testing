import _ from "lodash";
import { HttpStepAppTyped, LoopStepAppTyped, SleepStepAppTyped, StepTypeEnum, StepsAppTyped } from "../_type/Step";
import { deleteHttpStep, patchHttpStep } from "./HttpStep";
import { deleteLoopStep, patchLoopStep } from "./LoopStep";
import { deleteSleepStep, patchSleepStep } from "./SleepStep";
import { Scenario } from "../_type/Scenario";
import { HttpStep } from "@/services/models/http-step";
import { LoopStep } from "@/services/models/loop-step";
import { SleepStep } from "@/services/models/sleep-step";
import { SqsStep } from "@/services/models/sqs-step";
import { deleteSqsStep, patchSqsStep } from "./SqsStep";
import { ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead } from "@/services";


export function deleteStep(id: string, type: StepTypeEnum) {
    switch(type) {
        case StepTypeEnum.HttpStep:
            return deleteHttpStep(id)
        case StepTypeEnum.LoopStep:
            return deleteLoopStep(id)
        case StepTypeEnum.SleepStep:
            return deleteSleepStep(id)
        case StepTypeEnum.SqsStep:
            return deleteSqsStep(id)
      }
}

export async function handleSave(step: StepsAppTyped|null) {
    if (_.isNull(step)) {
      return;
    }

    switch(step?.type) {
        case StepTypeEnum.HttpStep:
            return await patchHttpStep({ step: step })
        case StepTypeEnum.LoopStep:
            return await patchLoopStep({ step: step })
        case StepTypeEnum.SleepStep:
            return await patchSleepStep({ step: step })
        case StepTypeEnum.SqsStep:
            return await patchSqsStep({ step: step })
    }
}

export function unformatStep(step: StepsAppTyped): HttpStep|LoopStep|SleepStep|SqsStep {
    
    var globalStep = {
        ...step,
        variables: step.variables
    }
    switch(step.type) {
        case StepTypeEnum.HttpStep:
            return {
                ...globalStep,
                content: step.content,
                headers: step.headers,
                checkConditions: step.checkConditions,
                treatment: step.treatment
            } as HttpStep;
        case StepTypeEnum.LoopStep:
            return {
                ...globalStep,
                conditions: step.conditions,
            } as LoopStep;
        case StepTypeEnum.SleepStep:
            return {
                ...globalStep,
            } as SleepStep;
        case StepTypeEnum.SqsStep:
            return {
                ...globalStep,
            } as SqsStep;
        default:
            return globalStep as HttpStep;
    }
}

export function unformatSteps(scenario: Scenario): any {
    return scenario.steps ?
        Object.entries(scenario.steps).map(([, step]) => {
            return unformatStep(step)
        }) 
        : [];
}

export function formatSteps(scenario: ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead): any {
    return scenario.steps ?
        Object.entries(scenario.steps).map(([, step]) => {
            var globalStep = {
                ...step,
                type: step['@type'],
                variables: step.variables
            }

            switch(globalStep.type) {
                case StepTypeEnum.HttpStep:
                    const httpStep = step as HttpStep;
                    return {
                        ...globalStep,
                        url: httpStep.url || '',
                        content: httpStep.content,
                        headers: httpStep.headers,
                        checkConditions: httpStep.checkConditions,
                        treatment: httpStep.treatment
                    } as HttpStepAppTyped
                case StepTypeEnum.LoopStep:
                    const loopStep = step as LoopStep;
                    return {
                        ...globalStep,
                        conditions: loopStep.conditions
                    } as LoopStepAppTyped;
                case StepTypeEnum.SleepStep:
                    const sleepStep = step as SleepStep;
                    return {
                        ...globalStep,
                        duration: sleepStep.duration
                    } as SleepStepAppTyped;
                default:
                    return globalStep;
            }
        }) 
        : [];
}

export function formatScenario(scenario: ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead): Scenario {
	return {
		id: scenario.id ?? '',
        type: scenario['@type'],
		name: scenario.name,
		variables: scenario.variables,
		steps: formatSteps(scenario),
        cron: scenario.cron,
        metrics: scenario.metrics
	}
}