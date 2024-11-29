
import { SleepStep, SleepStepApi, SleepStepApiSleepStepsPostRequest } from "@/services";
import { SleepStepAppTyped } from "../_type/Step";
const sleepStepApi = new SleepStepApi();

export async function addSleepStep(sleepStepJsonld: SleepStep) {
	const iri = '/api/scenarios/'
    if (!(sleepStepJsonld.scenario.includes(iri))) {
        sleepStepJsonld.scenario = iri + sleepStepJsonld.scenario
    }
	return await sleepStepApi.sleepStepsPost({ data: sleepStepJsonld}).then(async (step) => {
			return {
				id: step.data.id ?? '',
			}
	  });
};

export async function deleteSleepStep(id: string) {
    return await sleepStepApi.sleepStepsIdDelete({ id });
}

interface PatchSleepStepProps {
    step: SleepStepAppTyped;
}

export async function patchSleepStep({ step }: PatchSleepStepProps) {
    const { ['type']: removedKey, variables, ...rest } = step;
    const variablesTranslate = variables

	const apiStep = {
        ...rest,
        variables: variablesTranslate,
    };

    return await sleepStepApi.sleepStepsIdPatch({ id: rest.id ?? '', data: apiStep }).then(async (step) => {
        return step;
    });
}