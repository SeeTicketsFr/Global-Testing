import { ApiWebhooksGetCollection200Response, WebhookApi, WebhookApiWebhooksIdPatchRequest, WebhookApiWebhooksPostRequest } from "@/services";
import { AxiosResponse } from "axios";
const webhookApi = new WebhookApi();

export async function getWebhookById(idScenario: string, page = 1, itemsPerPage = 10) {
    return await webhookApi.webhooksscenariosIdScenarioGetCollection({
        idScenario,
        page,
		itemsPerPage
    }).then(async (response: AxiosResponse<ApiWebhooksGetCollection200Response>) => {
        const totalItems = response.data['hydra:totalItems'];

        return {
            data: response.data['hydra:member'],
            totalItems: totalItems !== undefined ? totalItems : 0,
            totalPages: totalItems !== undefined ? Math.ceil(totalItems / itemsPerPage) : 0
        };
    });
}

export async function addWebhook({ data }: WebhookApiWebhooksPostRequest) {
    return await webhookApi.webhooksPost({ data });
}

export async function deleteWebhook(id: string) {
	return await webhookApi.webhooksIdDelete({ id });
};

export async function updateWebhook({ id, data }: WebhookApiWebhooksIdPatchRequest) {
    return await webhookApi.webhooksIdPatch({ id, data });
}