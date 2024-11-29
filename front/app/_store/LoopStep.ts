
import { LoopStep, LoopStepApi, LoopStepApiLoopStepsPostRequest } from "@/services";
import { LoopStepAppTyped } from "../_type/Step";
const loopStepApi = new LoopStepApi();

export async function addLoopStep(loopStepJsonld: LoopStep) {
	const iri = '/api/scenarios/'
    if (!(loopStepJsonld.scenario.includes(iri))) {
        loopStepJsonld.scenario = iri + loopStepJsonld.scenario
    }
	return await loopStepApi.loopStepsPost({ data: loopStepJsonld}).then(async (step) => {
			return {
				id: step.data.id ?? '',
			}
	  });
  };

export async function deleteLoopStep(id: string) {
    return await loopStepApi.loopStepsIdDelete({ id });
}

interface PatchLoopStepProps {
    step: LoopStepAppTyped;
}

export async function patchLoopStep({ step }: PatchLoopStepProps) {
    const { ['type']: removedKey, ...rest } = step;

    return await loopStepApi.loopStepsIdPatch({ id: rest.id ?? '', data: rest }).then(async (step) => {
        return step;
    });
}