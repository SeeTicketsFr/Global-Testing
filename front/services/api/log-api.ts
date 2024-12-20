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
import { ApiLogsscenariosIdScenarioGetCollection200Response } from '../models';
/**
 * LogApi - axios parameter creator
 * @export
 */

export const LogApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Retrieves the collection of Log resources.
         * @summary Retrieves the collection of Log resources.
         * @param {string} idExecution Log identifier
         * @param {number} [page] The collection page number
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            logsIdExecutionGetCollection: async (idExecution: string, page?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'idExecution' is not null or undefined
            assertParamExists('logsIdExecutionGetCollection', 'idExecution', idExecution)
            const localVarPath = `/api/logs/{idExecution}`
                .replace(`{${"idExecution"}}`, encodeURIComponent(String(idExecution)));
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
         * Retrieves the collection of Log resources.
         * @summary Retrieves the collection of Log resources.
         * @param {string} idScenario Log identifier
         * @param {number} [page] The collection page number
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            logsscenariosIdScenarioGetCollection: async (idScenario: string, page?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'idScenario' is not null or undefined
            assertParamExists('logsscenariosIdScenarioGetCollection', 'idScenario', idScenario)
            const localVarPath = `/api/logs/scenarios/{idScenario}`
                .replace(`{${"idScenario"}}`, encodeURIComponent(String(idScenario)));
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
    }
};


/**
 * LogApi - functional programming interface
 * @export
 */
export const LogApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LogApiAxiosParamCreator(configuration)
    return {
        /**
         * Retrieves the collection of Log resources.
         * @summary Retrieves the collection of Log resources.
         * @param {string} idExecution Log identifier
         * @param {number} [page] The collection page number
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */


        async logsIdExecutionGetCollection(idExecution: string, page?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiLogsscenariosIdScenarioGetCollection200Response>> {
                const localVarAxiosArgs = await localVarAxiosParamCreator.logsIdExecutionGetCollection(idExecution, page, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Retrieves the collection of Log resources.
         * @summary Retrieves the collection of Log resources.
         * @param {string} idScenario Log identifier
         * @param {number} [page] The collection page number
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */


        async logsscenariosIdScenarioGetCollection(idScenario: string, page?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiLogsscenariosIdScenarioGetCollection200Response>> {
                const localVarAxiosArgs = await localVarAxiosParamCreator.logsscenariosIdScenarioGetCollection(idScenario, page, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * Request parameters for logsIdExecutionGetCollection operation in LogApi.
 * @export
 * @interface LogApiLogsIdExecutionGetCollectionRequest
 */
export interface LogApiLogsIdExecutionGetCollectionRequest {
    /**
     * Log identifier
     * @type {string}
     * @memberof LogApiLogsIdExecutionGetCollection
     */
    readonly idExecution: string
    /**
     * The collection page number
     * @type {number}
     * @memberof LogApiLogsIdExecutionGetCollection
     */
    readonly page?: number
}
/**
 * Request parameters for logsscenariosIdScenarioGetCollection operation in LogApi.
 * @export
 * @interface LogApiLogsscenariosIdScenarioGetCollectionRequest
 */
export interface LogApiLogsscenariosIdScenarioGetCollectionRequest {
    /**
     * Log identifier
     * @type {string}
     * @memberof LogApiLogsscenariosIdScenarioGetCollection
     */
    readonly idScenario: string
    /**
     * The collection page number
     * @type {number}
     * @memberof LogApiLogsscenariosIdScenarioGetCollection
     */
    readonly page?: number
}
/**
 * LogApi - object-oriented interface
 * @export
 * @class LogApi
 * @extends {BaseAPI}
 */
export class LogApi extends BaseAPI {
    /**
     * Retrieves the collection of Log resources.
     * @summary Retrieves the collection of Log resources.
     * @param {LogApiLogsIdExecutionGetCollectionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogApi
     */
    public logsIdExecutionGetCollection(requestParameters: LogApiLogsIdExecutionGetCollectionRequest, options?: AxiosRequestConfig) {

        return LogApiFp(this.configuration).logsIdExecutionGetCollection(requestParameters.idExecution, requestParameters.page, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves the collection of Log resources.
     * @summary Retrieves the collection of Log resources.
     * @param {LogApiLogsscenariosIdScenarioGetCollectionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogApi
     */
    public logsscenariosIdScenarioGetCollection(requestParameters: LogApiLogsscenariosIdScenarioGetCollectionRequest, options?: AxiosRequestConfig) {

        return LogApiFp(this.configuration).logsscenariosIdScenarioGetCollection(requestParameters.idScenario, requestParameters.page, options).then((request) => request(this.axios, this.basePath));
    }
}

