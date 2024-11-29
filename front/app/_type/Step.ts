import { HttpStep } from "@/services/models/http-step";
import { LoopStep } from "@/services/models/loop-step";
import { SleepStep } from "@/services/models/sleep-step";
import { SqsStep } from "@/services/models/sqs-step";

export enum StepTypeEnum {
    HttpStep = 'HttpStep',
    LoopStep = 'LoopStep',
    SleepStep = 'SleepStep',
    SqsStep = 'SqsStep'
}

export interface HttpStepAppTyped extends HttpStep {
    type: StepTypeEnum.HttpStep;
}

export interface LoopStepAppTyped extends LoopStep {
    type: StepTypeEnum.LoopStep;
}

export interface SleepStepAppTyped extends SleepStep {
    type: StepTypeEnum.SleepStep;
}

export interface SqsStepAppTyped extends SqsStep {
    type: StepTypeEnum.SqsStep;
}

export type StepsAppTyped = HttpStepAppTyped | LoopStepAppTyped | SleepStepAppTyped | SqsStepAppTyped