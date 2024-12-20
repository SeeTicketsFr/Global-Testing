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
import { LogHttpStepJsonld } from '../models';
/**
 * LogHttpStepApi - axios parameter creator
 * @export
 */

export const LogHttpStepApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Retrieves a LogHttpStep resource.
         * @summary Retrieves a LogHttpStep resource.
         * @param {string} id LogHttpStep identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            logHttpStepsIdGet: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('logHttpStepsIdGet', 'id', id)
            const localVarPath = `/api/log_http_steps/{id}`
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
    }
};


/**
 * LogHttpStepApi - functional programming interface
 * @export
 */
export const LogHttpStepApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LogHttpStepApiAxiosParamCreator(configuration)
    return {
        /**
         * Retrieves a LogHttpStep resource.
         * @summary Retrieves a LogHttpStep resource.
         * @param {string} id LogHttpStep identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */


        async logHttpStepsIdGet(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LogHttpStepJsonld>> {
                const localVarAxiosArgs = await localVarAxiosParamCreator.logHttpStepsIdGet(id, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * Request parameters for logHttpStepsIdGet operation in LogHttpStepApi.
 * @export
 * @interface LogHttpStepApiLogHttpStepsIdGetRequest
 */
export interface LogHttpStepApiLogHttpStepsIdGetRequest {
    /**
     * LogHttpStep identifier
     * @type {string}
     * @memberof LogHttpStepApiLogHttpStepsIdGet
     */
    readonly id: string
}
/**
 * LogHttpStepApi - object-oriented interface
 * @export
 * @class LogHttpStepApi
 * @extends {BaseAPI}
 */
export class LogHttpStepApi extends BaseAPI {
    /**
     * Retrieves a LogHttpStep resource.
     * @summary Retrieves a LogHttpStep resource.
     * @param {LogHttpStepApiLogHttpStepsIdGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogHttpStepApi
     */
    public logHttpStepsIdGet(requestParameters: LogHttpStepApiLogHttpStepsIdGetRequest, options?: AxiosRequestConfig) {

        return LogHttpStepApiFp(this.configuration).logHttpStepsIdGet(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }
}

