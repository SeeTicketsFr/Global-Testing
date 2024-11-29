
import { ScenarioApi, ScenarioApiScenariosIdPatchRequest, ScenarioApiScenariosPostRequest } from "@/services";
import { formatScenario } from "./utils";
import { ApiScenariosGetCollection200Response } from "@/services/models/api-scenarios-get-collection200-response";
import { AxiosResponse } from "axios";
import { ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead } from "@/services";
const scenarioApi = new ScenarioApi();


export async function getScenarios() {
  return await scenarioApi.scenariosGetCollection().then(async (response: AxiosResponse<ApiScenariosGetCollection200Response>) => {
		const scenarios = response.data['hydra:member'];

		const data = await Promise.all(
			scenarios.map(async (scenario) => {
				return formatScenario(scenario)
			})
		);
		return data;
	});
};

interface AddScenarioProps {
	name: string,
}
export async function addScenario({ name }: AddScenarioProps) {
	const scenarioJsonldScenarioWrite: ScenarioApiScenariosPostRequest = {
		data: {
			name: name
		}
	};
	return await scenarioApi.scenariosPost({ ...scenarioJsonldScenarioWrite }).then(async (scenario: AxiosResponse<ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead>) => {
			return formatScenario(scenario.data)
	  });
  };

interface DeleteScenarioProps {
	id: string,
}
export async function deleteScenario({ id }: DeleteScenarioProps) {
	return await scenarioApi.scenariosIdDelete({ id });
};

interface RunScenarioProps {
	scenarioId: string,
}
export async function runScenario({ scenarioId }: RunScenarioProps) {
	return await scenarioApi.runScenario({ scenarioId }).then(async (response) => {
		return {
			scenarioId: response.data.scenarioId,
			executionId: response.data.executionId,
		}
  });
};


interface GetScenarioProps {
	id: string
}

export async function getScenario(id: GetScenarioProps) {
  	return await scenarioApi.scenariosIdGet(id).then(async (response: AxiosResponse<ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead>) => {
		return response.data;
	});
};


export async function patchScenario({ id, data }: ScenarioApiScenariosIdPatchRequest) {
    return await scenarioApi.scenariosIdPatch({ id, data }).then(async (step) => {
        return step.data;
    });
}