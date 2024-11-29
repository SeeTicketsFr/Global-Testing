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
import { ApiScenarioMetricssGetCollection200Response } from '../models';
// @ts-ignore
import { ScenarioMetrics } from '../models';
// @ts-ignore
import { ScenarioMetricsJsonld } from '../models';
// @ts-ignore
import { ScenarioMetricsJsonldMetricsRead } from '../models';
/**
 * ScenarioMetricsApi - axios parameter creator
 * @export
 */

export const ScenarioMetricsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Retrieves the collection of ScenarioMetrics resources.
         * @summary Retrieves the collection of ScenarioMetrics resources.
         * @param {number} [page] The collection page number
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            scenarioMetricssGetCollection: async (page?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/scenario_metricss`;
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
         * Removes the ScenarioMetrics resource.
         * @summary Removes the ScenarioMetrics resource.
         * @param {string} id ScenarioMetrics identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            scenarioMetricssIdDelete: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('scenarioMetricssIdDelete', 'id', id)
            const localVarPath = `/api/scenario_metricss/{id}`
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
         * Retrieves a ScenarioMetrics resource.
         * @summary Retrieves a ScenarioMetrics resource.
         * @param {string} id ScenarioMetrics identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            scenarioMetricssIdGet: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('scenarioMetricssIdGet', 'id', id)
            const localVarPath = `/api/scenario_metricss/{id}`
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
         * Updates the ScenarioMetrics resource.
         * @summary Updates the ScenarioMetrics resource.
        * @param {string} id
        * @param data ScenarioMetrics
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            scenarioMetricssIdPatch: async (id: string, data: ScenarioMetrics, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'scenarioMetrics' is not null or undefined
            assertParamExists('scenarioMetricssIdPatch', 'id', id)
            assertParamExists('scenarioMetricssIdPatch', 'data', data)
            const localVarPath = `/api/scenario_metricss/{id}`
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
         * Replaces the ScenarioMetrics resource.
         * @summary Replaces the ScenarioMetrics resource.
        * @param {string} id
        * @param data ScenarioMetricsJsonld
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            scenarioMetricssIdPut: async (id: string, data: ScenarioMetricsJsonld, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'scenarioMetricsJsonld' is not null or undefined
            assertParamExists('scenarioMetricssIdPut', 'id', id)
            assertParamExists('scenarioMetricssIdPut', 'data', data)
            const localVarPath = `/api/scenario_metricss/{id}`
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
         * Creates a ScenarioMetrics resource.
         * @summary Creates a ScenarioMetrics resource.
        * @param {ScenarioMetricsJsonld} data The new ScenarioMetrics resource
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            scenarioMetricssPost: async (data: ScenarioMetricsJsonld, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'scenarioMetricsJsonld' is not null or undefined
            assertParamExists('scenarioMetricssPost', 'data', data)
            const localVarPath = `/api/scenario_metricss`;
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
 * ScenarioMetricsApi - functional programming interface
 * @export
 */
export const ScenarioMetricsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ScenarioMetricsApiAxiosParamCreator(configuration)
    return {
        /**
         * Retrieves the collection of ScenarioMetrics resources.
         * @summary Retrieves the collection of ScenarioMetrics resources.
         * @param {number} [page] The collection page number
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */


        async scenarioMetricssGetCollection(page?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiScenarioMetricssGetCollection200Response>> {
                const localVarAxiosArgs = await localVarAxiosParamCreator.scenarioMetricssGetCollection(page, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Removes the ScenarioMetrics resource.
         * @summary Removes the ScenarioMetrics resource.
         * @param {string} id ScenarioMetrics identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */


        async scenarioMetricssIdDelete(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
                const localVarAxiosArgs = await localVarAxiosParamCreator.scenarioMetricssIdDelete(id, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Retrieves a ScenarioMetrics resource.
         * @summary Retrieves a ScenarioMetrics resource.
         * @param {string} id ScenarioMetrics identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */


        async scenarioMetricssIdGet(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ScenarioMetricsJsonldMetricsRead>> {
                const localVarAxiosArgs = await localVarAxiosParamCreator.scenarioMetricssIdGet(id, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Updates the ScenarioMetrics resource.
         * @summary Updates the ScenarioMetrics resource.
                    * @param {string} id
                    * @param data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */

                async scenarioMetricssIdPatch(id: string, data: ScenarioMetrics, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ScenarioMetricsJsonldMetricsRead>> {

                const localVarAxiosArgs = await localVarAxiosParamCreator.scenarioMetricssIdPatch(id, data, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Replaces the ScenarioMetrics resource.
         * @summary Replaces the ScenarioMetrics resource.
                    * @param {string} id
                    * @param data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */

                async scenarioMetricssIdPut(id: string, data: ScenarioMetricsJsonld, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ScenarioMetricsJsonldMetricsRead>> {

                const localVarAxiosArgs = await localVarAxiosParamCreator.scenarioMetricssIdPut(id, data, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Creates a ScenarioMetrics resource.
         * @summary Creates a ScenarioMetrics resource.
                    * @param {ScenarioMetricsJsonld} data The new ScenarioMetrics resource
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */

                async scenarioMetricssPost(data: ScenarioMetricsJsonld, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ScenarioMetricsJsonldMetricsRead>> {

                const localVarAxiosArgs = await localVarAxiosParamCreator.scenarioMetricssPost(data, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * Request parameters for scenarioMetricssGetCollection operation in ScenarioMetricsApi.
 * @export
 * @interface ScenarioMetricsApiScenarioMetricssGetCollectionRequest
 */
export interface ScenarioMetricsApiScenarioMetricssGetCollectionRequest {
    /**
     * The collection page number
     * @type {number}
     * @memberof ScenarioMetricsApiScenarioMetricssGetCollection
     */
    readonly page?: number
}
/**
 * Request parameters for scenarioMetricssIdDelete operation in ScenarioMetricsApi.
 * @export
 * @interface ScenarioMetricsApiScenarioMetricssIdDeleteRequest
 */
export interface ScenarioMetricsApiScenarioMetricssIdDeleteRequest {
    /**
     * ScenarioMetrics identifier
     * @type {string}
     * @memberof ScenarioMetricsApiScenarioMetricssIdDelete
     */
    readonly id: string
}
/**
 * Request parameters for scenarioMetricssIdGet operation in ScenarioMetricsApi.
 * @export
 * @interface ScenarioMetricsApiScenarioMetricssIdGetRequest
 */
export interface ScenarioMetricsApiScenarioMetricssIdGetRequest {
    /**
     * ScenarioMetrics identifier
     * @type {string}
     * @memberof ScenarioMetricsApiScenarioMetricssIdGet
     */
    readonly id: string
}
/**
 * Request parameters for scenarioMetricssIdPatch operation in ScenarioMetricsApi.
 * @export
 * @interface ScenarioMetricsApiScenarioMetricssIdPatchRequest
 */
export interface ScenarioMetricsApiScenarioMetricssIdPatchRequest {
    /**
    * The updated ScenarioMetrics resource
    * @type {ScenarioMetrics}
    * @memberof ScenarioMetricsApiScenarioMetricssIdPatch
    */
    readonly id: string
    readonly data: ScenarioMetrics
}
/**
 * Request parameters for scenarioMetricssIdPut operation in ScenarioMetricsApi.
 * @export
 * @interface ScenarioMetricsApiScenarioMetricssIdPutRequest
 */
export interface ScenarioMetricsApiScenarioMetricssIdPutRequest {
    /**
    * The updated ScenarioMetrics resource
    * @type {ScenarioMetricsJsonld}
    * @memberof ScenarioMetricsApiScenarioMetricssIdPut
    */
    readonly id: string
    readonly data: ScenarioMetricsJsonld
}
/**
 * Request parameters for scenarioMetricssPost operation in ScenarioMetricsApi.
 * @export
 * @interface ScenarioMetricsApiScenarioMetricssPostRequest
 */
export interface ScenarioMetricsApiScenarioMetricssPostRequest {
    /**
    * The new ScenarioMetrics resource
    * @type {ScenarioMetricsJsonld}
    * @memberof ScenarioMetricsApiScenarioMetricssPost
    */
    readonly data: ScenarioMetricsJsonld
}
/**
 * ScenarioMetricsApi - object-oriented interface
 * @export
 * @class ScenarioMetricsApi
 * @extends {BaseAPI}
 */
export class ScenarioMetricsApi extends BaseAPI {
    /**
     * Retrieves the collection of ScenarioMetrics resources.
     * @summary Retrieves the collection of ScenarioMetrics resources.
     * @param {ScenarioMetricsApiScenarioMetricssGetCollectionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ScenarioMetricsApi
     */
    public scenarioMetricssGetCollection(requestParameters: ScenarioMetricsApiScenarioMetricssGetCollectionRequest = {}, options?: AxiosRequestConfig) {

        return ScenarioMetricsApiFp(this.configuration).scenarioMetricssGetCollection(requestParameters.page, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Removes the ScenarioMetrics resource.
     * @summary Removes the ScenarioMetrics resource.
     * @param {ScenarioMetricsApiScenarioMetricssIdDeleteRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ScenarioMetricsApi
     */
    public scenarioMetricssIdDelete(requestParameters: ScenarioMetricsApiScenarioMetricssIdDeleteRequest, options?: AxiosRequestConfig) {

        return ScenarioMetricsApiFp(this.configuration).scenarioMetricssIdDelete(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves a ScenarioMetrics resource.
     * @summary Retrieves a ScenarioMetrics resource.
     * @param {ScenarioMetricsApiScenarioMetricssIdGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ScenarioMetricsApi
     */
    public scenarioMetricssIdGet(requestParameters: ScenarioMetricsApiScenarioMetricssIdGetRequest, options?: AxiosRequestConfig) {

        return ScenarioMetricsApiFp(this.configuration).scenarioMetricssIdGet(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Updates the ScenarioMetrics resource.
     * @summary Updates the ScenarioMetrics resource.
     * @param {ScenarioMetricsApiScenarioMetricssIdPatchRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ScenarioMetricsApi
     */
    public scenarioMetricssIdPatch(requestParameters: ScenarioMetricsApiScenarioMetricssIdPatchRequest, options?: AxiosRequestConfig) {

    return ScenarioMetricsApiFp(this.configuration).scenarioMetricssIdPatch(requestParameters.id, requestParameters.data, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Replaces the ScenarioMetrics resource.
     * @summary Replaces the ScenarioMetrics resource.
     * @param {ScenarioMetricsApiScenarioMetricssIdPutRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ScenarioMetricsApi
     */
    public scenarioMetricssIdPut(requestParameters: ScenarioMetricsApiScenarioMetricssIdPutRequest, options?: AxiosRequestConfig) {

    return ScenarioMetricsApiFp(this.configuration).scenarioMetricssIdPut(requestParameters.id, requestParameters.data, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Creates a ScenarioMetrics resource.
     * @summary Creates a ScenarioMetrics resource.
     * @param {ScenarioMetricsApiScenarioMetricssPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ScenarioMetricsApi
     */
    public scenarioMetricssPost(requestParameters: ScenarioMetricsApiScenarioMetricssPostRequest, options?: AxiosRequestConfig) {

    return ScenarioMetricsApiFp(this.configuration).scenarioMetricssPost(requestParameters.data, options).then((request) => request(this.axios, this.basePath));
    }
}
