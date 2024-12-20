/* tslint:disable */
/* eslint-disable */
/**
 * Global Testing
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { ApiHttpStepsGetCollection200Response } from '../models';
// @ts-ignore
import { HttpStep } from '../models';
// @ts-ignore
import { HttpStepJsonld } from '../models';
// @ts-ignore
import { HttpStepJsonldHttpstepReadStepRead } from '../models';
/**
 * HttpStepApi - axios parameter creator
 * @export
 */

export const HttpStepApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Retrieves the collection of HttpStep resources.
         * @summary Retrieves the collection of HttpStep resources.
         * @param {number} [page] The collection page number
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            httpStepsGetCollection: async (page?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/http_steps`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Removes the HttpStep resource.
         * @summary Removes the HttpStep resource.
         * @param {string} id HttpStep identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            httpStepsIdDelete: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('httpStepsIdDelete', 'id', id)
            const localVarPath = `/api/http_steps/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Retrieves a HttpStep resource.
         * @summary Retrieves a HttpStep resource.
         * @param {string} id HttpStep identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            httpStepsIdGet: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('httpStepsIdGet', 'id', id)
            const localVarPath = `/api/http_steps/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Updates the HttpStep resource.
         * @summary Updates the HttpStep resource.
        * @param {string} id
        * @param data HttpStep
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            httpStepsIdPatch: async (id: string, data: HttpStep, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'httpStep' is not null or undefined
            assertParamExists('httpStepsIdPatch', 'id', id)
            assertParamExists('httpStepsIdPatch', 'data', data)
            const localVarPath = `/api/http_steps/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/merge-patch+json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(data, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Replaces the HttpStep resource.
         * @summary Replaces the HttpStep resource.
        * @param {string} id
        * @param data HttpStepJsonld
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            httpStepsIdPut: async (id: string, data: HttpStepJsonld, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'httpStepJsonld' is not null or undefined
            assertParamExists('httpStepsIdPut', 'id', id)
            assertParamExists('httpStepsIdPut', 'data', data)
            const localVarPath = `/api/http_steps/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/ld+json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(data, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Creates a HttpStep resource.
         * @summary Creates a HttpStep resource.
        * @param {HttpStepJsonld} data The new HttpStep resource
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            httpStepsPost: async (data: HttpStepJsonld, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'httpStepJsonld' is not null or undefined
            assertParamExists('httpStepsPost', 'data', data)
            const localVarPath = `/api/http_steps`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/ld+json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(data, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};


/**
 * HttpStepApi - functional programming interface
 * @export
 */
export const HttpStepApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = HttpStepApiAxiosParamCreator(configuration)
    return {
        /**
         * Retrieves the collection of HttpStep resources.
         * @summary Retrieves the collection of HttpStep resources.
         * @param {number} [page] The collection page number
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */


        async httpStepsGetCollection(page?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiHttpStepsGetCollection200Response>> {
                const localVarAxiosArgs = await localVarAxiosParamCreator.httpStepsGetCollection(page, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Removes the HttpStep resource.
         * @summary Removes the HttpStep resource.
         * @param {string} id HttpStep identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */


        async httpStepsIdDelete(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
                const localVarAxiosArgs = await localVarAxiosParamCreator.httpStepsIdDelete(id, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Retrieves a HttpStep resource.
         * @summary Retrieves a HttpStep resource.
         * @param {string} id HttpStep identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */


        async httpStepsIdGet(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HttpStepJsonldHttpstepReadStepRead>> {
                const localVarAxiosArgs = await localVarAxiosParamCreator.httpStepsIdGet(id, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Updates the HttpStep resource.
         * @summary Updates the HttpStep resource.
                    * @param {string} id
                    * @param data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */

                async httpStepsIdPatch(id: string, data: HttpStep, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HttpStepJsonldHttpstepReadStepRead>> {

                const localVarAxiosArgs = await localVarAxiosParamCreator.httpStepsIdPatch(id, data, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Replaces the HttpStep resource.
         * @summary Replaces the HttpStep resource.
                    * @param {string} id
                    * @param data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */

                async httpStepsIdPut(id: string, data: HttpStepJsonld, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HttpStepJsonldHttpstepReadStepRead>> {

                const localVarAxiosArgs = await localVarAxiosParamCreator.httpStepsIdPut(id, data, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Creates a HttpStep resource.
         * @summary Creates a HttpStep resource.
                    * @param {HttpStepJsonld} data The new HttpStep resource
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */

                async httpStepsPost(data: HttpStepJsonld, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HttpStepJsonldHttpstepReadStepRead>> {

                const localVarAxiosArgs = await localVarAxiosParamCreator.httpStepsPost(data, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * Request parameters for httpStepsGetCollection operation in HttpStepApi.
 * @export
 * @interface HttpStepApiHttpStepsGetCollectionRequest
 */
export interface HttpStepApiHttpStepsGetCollectionRequest {
    /**
     * The collection page number
     * @type {number}
     * @memberof HttpStepApiHttpStepsGetCollection
     */
    readonly page?: number
}
/**
 * Request parameters for httpStepsIdDelete operation in HttpStepApi.
 * @export
 * @interface HttpStepApiHttpStepsIdDeleteRequest
 */
export interface HttpStepApiHttpStepsIdDeleteRequest {
    /**
     * HttpStep identifier
     * @type {string}
     * @memberof HttpStepApiHttpStepsIdDelete
     */
    readonly id: string
}
/**
 * Request parameters for httpStepsIdGet operation in HttpStepApi.
 * @export
 * @interface HttpStepApiHttpStepsIdGetRequest
 */
export interface HttpStepApiHttpStepsIdGetRequest {
    /**
     * HttpStep identifier
     * @type {string}
     * @memberof HttpStepApiHttpStepsIdGet
     */
    readonly id: string
}
/**
 * Request parameters for httpStepsIdPatch operation in HttpStepApi.
 * @export
 * @interface HttpStepApiHttpStepsIdPatchRequest
 */
export interface HttpStepApiHttpStepsIdPatchRequest {
    /**
    * The updated HttpStep resource
    * @type {HttpStep}
    * @memberof HttpStepApiHttpStepsIdPatch
    */
    readonly id: string
    readonly data: HttpStep
}
/**
 * Request parameters for httpStepsIdPut operation in HttpStepApi.
 * @export
 * @interface HttpStepApiHttpStepsIdPutRequest
 */
export interface HttpStepApiHttpStepsIdPutRequest {
    /**
    * The updated HttpStep resource
    * @type {HttpStepJsonld}
    * @memberof HttpStepApiHttpStepsIdPut
    */
    readonly id: string
    readonly data: HttpStepJsonld
}
/**
 * Request parameters for httpStepsPost operation in HttpStepApi.
 * @export
 * @interface HttpStepApiHttpStepsPostRequest
 */
export interface HttpStepApiHttpStepsPostRequest {
    /**
    * The new HttpStep resource
    * @type {HttpStepJsonld}
    * @memberof HttpStepApiHttpStepsPost
    */
    readonly data: HttpStepJsonld
}
/**
 * HttpStepApi - object-oriented interface
 * @export
 * @class HttpStepApi
 * @extends {BaseAPI}
 */
export class HttpStepApi extends BaseAPI {
    /**
     * Retrieves the collection of HttpStep resources.
     * @summary Retrieves the collection of HttpStep resources.
     * @param {HttpStepApiHttpStepsGetCollectionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HttpStepApi
     */
    public httpStepsGetCollection(requestParameters: HttpStepApiHttpStepsGetCollectionRequest = {}, options?: AxiosRequestConfig) {

        return HttpStepApiFp(this.configuration).httpStepsGetCollection(requestParameters.page, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Removes the HttpStep resource.
     * @summary Removes the HttpStep resource.
     * @param {HttpStepApiHttpStepsIdDeleteRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HttpStepApi
     */
    public httpStepsIdDelete(requestParameters: HttpStepApiHttpStepsIdDeleteRequest, options?: AxiosRequestConfig) {

        return HttpStepApiFp(this.configuration).httpStepsIdDelete(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves a HttpStep resource.
     * @summary Retrieves a HttpStep resource.
     * @param {HttpStepApiHttpStepsIdGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HttpStepApi
     */
    public httpStepsIdGet(requestParameters: HttpStepApiHttpStepsIdGetRequest, options?: AxiosRequestConfig) {

        return HttpStepApiFp(this.configuration).httpStepsIdGet(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Updates the HttpStep resource.
     * @summary Updates the HttpStep resource.
     * @param {HttpStepApiHttpStepsIdPatchRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HttpStepApi
     */
    public httpStepsIdPatch(requestParameters: HttpStepApiHttpStepsIdPatchRequest, options?: AxiosRequestConfig) {

    return HttpStepApiFp(this.configuration).httpStepsIdPatch(requestParameters.id, requestParameters.data, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Replaces the HttpStep resource.
     * @summary Replaces the HttpStep resource.
     * @param {HttpStepApiHttpStepsIdPutRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HttpStepApi
     */
    public httpStepsIdPut(requestParameters: HttpStepApiHttpStepsIdPutRequest, options?: AxiosRequestConfig) {

    return HttpStepApiFp(this.configuration).httpStepsIdPut(requestParameters.id, requestParameters.data, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Creates a HttpStep resource.
     * @summary Creates a HttpStep resource.
     * @param {HttpStepApiHttpStepsPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HttpStepApi
     */
    public httpStepsPost(requestParameters: HttpStepApiHttpStepsPostRequest, options?: AxiosRequestConfig) {

    return HttpStepApiFp(this.configuration).httpStepsPost(requestParameters.data, options).then((request) => request(this.axios, this.basePath));
    }
}

