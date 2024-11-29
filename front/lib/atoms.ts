import { formatScenario } from '@/app/_store/utils';
import { ICurrentApiDocumentationFile } from '@/app/_type/ApiDocumentation';
import { Scenario, ScenarioExecution } from '@/app/_type/Scenario';
import { StepsAppTyped, } from '@/app/_type/Step';
import { ApiDocumentation, ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead } from '@/services';
import { atom } from 'jotai';

export const initialScenarioAtom = atom<ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead>({
    name: 'no scenario',
    steps: [],
    variables: {},
    cron: "",
    metrics: null
});

export const modifiedInitialScenarioAtom = atom((get) => {
    return formatScenario(get(initialScenarioAtom));
});

export const scenarioAtom = atom<Scenario>({
    id: '0',
    type: '',
    name: 'no scenario',
    steps: [],
    variables: {},
    cron: "",
    metrics: null
});
export const currentStepAtom = atom<(StepsAppTyped|null)>(null);

export const currentScenarioExecution = atom<(ScenarioExecution|null)>(null);


export const apiDocumentationsAtom = atom<ApiDocumentation[]>([])

export const currentApiDocumentationFileAtom = atom<ICurrentApiDocumentationFile|null>(null);
