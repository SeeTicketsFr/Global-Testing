
import { LogApi, LogApiLogsIdExecutionGetCollectionRequest, LogApiLogsscenariosIdScenarioGetCollectionRequest } from "@/services";
import { ApiLogsscenariosIdScenarioGetCollection200Response } from "@/services/models/api-logsscenarios-id-scenario-get-collection200-response";
import { Log } from "@/services/models/log";
import { AxiosPromise, AxiosResponse } from "axios";

const logApi = new LogApi();

export async function getLogsByScenarioId({ idScenario, page = 1 }: LogApiLogsscenariosIdScenarioGetCollectionRequest): Promise<ApiLogsscenariosIdScenarioGetCollection200Response> {
    return await logApi.logsscenariosIdScenarioGetCollection({ idScenario, page }).then(async (response: AxiosResponse<ApiLogsscenariosIdScenarioGetCollection200Response>) => {        
        return response.data;
    });
}

export async function getLogsByExecutionId({ idExecution }: LogApiLogsIdExecutionGetCollectionRequest): Promise<Log[]> {
    return await logApi.logsIdExecutionGetCollection({ idExecution }).then(async (response: AxiosResponse<ApiLogsscenariosIdScenarioGetCollection200Response>) => {
        return response.data['hydra:member'];
    });
}
