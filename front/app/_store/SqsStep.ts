
import { SqsStep, SqsStepApi } from "@/services";
import { SqsStepAppTyped } from "../_type/Step";
const sqsStepApi = new SqsStepApi();

export async function addSqsStep(sqsStep: SqsStep) {
    const iri = '/api/scenarios/'
    if (!(sqsStep.scenario.includes(iri))) {
        sqsStep.scenario = iri + sqsStep.scenario
    }
	return await sqsStepApi.sqsStepsPost({ data: sqsStep}).then(async (step) => {
			return {
				id: step.data.id ?? '',
			}
    });
};

export async function deleteSqsStep(id: string) {
    return await sqsStepApi.sqsStepsIdDelete({ id });
}

interface PatchHttpStepProps {
    step: SqsStepAppTyped;
}

export async function patchSqsStep({ step }: PatchHttpStepProps) {
    const { ['type']: removedKey, url, ...rest } = step;

    const apiStep = {
        ...rest,
        url: url || '',
    };

    return await sqsStepApi.sqsStepsIdPatch({ id: rest.id ?? '', data: apiStep }).then(async (step) => {
        return step;
    });
}