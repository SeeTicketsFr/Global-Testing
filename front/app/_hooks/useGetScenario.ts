import { useSetAtom } from 'jotai';
import { initialScenarioAtom, scenarioAtom } from "@/lib/atoms";
import { getScenario, getScenarios } from '../_store/Scenarios';
import { formatScenario } from '../_store/utils';

export function useGetScenario() {
    const setInitialScenario = useSetAtom(initialScenarioAtom);
    const setScenario = useSetAtom(scenarioAtom);

    const get = async (id: string) => {
        const scenario = await getScenario({ id });
        setInitialScenario(scenario);
        setScenario(formatScenario(scenario));
        return scenario;
    }

    return { get };
}

