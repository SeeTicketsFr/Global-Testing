
import { HttpStep, HttpStepApi, HttpStepApiHttpStepsPostRequest } from "@/services";
import { HttpStepAppTyped } from "../_type/Step";
const httpStepApi = new HttpStepApi();

export async function addHttpStep(httpStepJsonld: HttpStep) {
    const iri = '/api/scenarios/'
    if (!(httpStepJsonld.scenario.includes(iri))) {
        httpStepJsonld.scenario = iri + httpStepJsonld.scenario
    }
	return await httpStepApi.httpStepsPost({ data: httpStepJsonld}).then(async (step) => {
            
			return {
				id: step.data.id ?? '',
			}
    });
};

export async function deleteHttpStep(id: string) {
    return await httpStepApi.httpStepsIdDelete({ id });
}

interface PatchHttpStepProps {
    step: HttpStepAppTyped;
}

export async function patchHttpStep({ step }: PatchHttpStepProps) {
    const { ['type']: removedKey, url, ...rest } = step;

    const apiStep = {
        ...rest,
        url: url || '',
    };

    return await httpStepApi.httpStepsIdPatch({ id: rest.id ?? '', data: apiStep }).then(async (step) => {
        return step;
    });
}