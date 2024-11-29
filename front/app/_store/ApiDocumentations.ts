import { ApiApiDocumentationsGetCollection200Response, ApiDocumentationApi, ApiDocumentationApiApiDocumentationsIdPatchRequest, ApiDocumentationApiApiDocumentationsPostRequest } from "@/services";
import { AxiosResponse } from "axios";
const apiDocumentationApi = new ApiDocumentationApi();

export async function getApiDocumentations(page = 1, itemsPerPage = 10) {
    return await apiDocumentationApi.apiDocumentationsGetCollection({
        page,
		itemsPerPage
    }).then(async (response: AxiosResponse<ApiApiDocumentationsGetCollection200Response>) => {
        const totalItems = response.data['hydra:totalItems'];

        return {
            data: response.data['hydra:member'],
            totalItems: totalItems !== undefined ? totalItems : 0,
            totalPages: totalItems !== undefined ? Math.ceil(totalItems / itemsPerPage) : 0
        };
    });
}

export async function addApiDocumentation({ data }: ApiDocumentationApiApiDocumentationsPostRequest) {
    return await apiDocumentationApi.apiDocumentationsPost({ data });
}

export async function deleteApiDocumentation(id: string) {
	return await apiDocumentationApi.apiDocumentationsIdDelete({ id });
};

export async function updateApiDocumentation({ id, data }: ApiDocumentationApiApiDocumentationsIdPatchRequest) {
    return await apiDocumentationApi.apiDocumentationsIdPatch({ id, data });
}

export async function getApiDocumentationFile(id: string) {
    return await apiDocumentationApi.apiDocumentationsIdfileGet({ id });
}