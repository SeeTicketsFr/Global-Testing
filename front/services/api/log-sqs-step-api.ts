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
import { LogSqsStepJsonld } from '../models';
/**
 * LogSqsStepApi - axios parameter creator
 * @export
 */

export const LogSqsStepApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Retrieves a LogSqsStep resource.
         * @summary Retrieves a LogSqsStep resource.
         * @param {string} id LogSqsStep identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            logSqsStepsIdGet: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('logSqsStepsIdGet', 'id', id)
            const localVarPath = `/api/log_sqs_steps/{id}`
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
 * LogSqsStepApi - functional programming interface
 * @export
 */
export const LogSqsStepApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LogSqsStepApiAxiosParamCreator(configuration)
    return {
        /**
         * Retrieves a LogSqsStep resource.
         * @summary Retrieves a LogSqsStep resource.
         * @param {string} id LogSqsStep identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */


        async logSqsStepsIdGet(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LogSqsStepJsonld>> {
                const localVarAxiosArgs = await localVarAxiosParamCreator.logSqsStepsIdGet(id, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * Request parameters for logSqsStepsIdGet operation in LogSqsStepApi.
 * @export
 * @interface LogSqsStepApiLogSqsStepsIdGetRequest
 */
export interface LogSqsStepApiLogSqsStepsIdGetRequest {
    /**
     * LogSqsStep identifier
     * @type {string}
     * @memberof LogSqsStepApiLogSqsStepsIdGet
     */
    readonly id: string
}
/**
 * LogSqsStepApi - object-oriented interface
 * @export
 * @class LogSqsStepApi
 * @extends {BaseAPI}
 */
export class LogSqsStepApi extends BaseAPI {
    /**
     * Retrieves a LogSqsStep resource.
     * @summary Retrieves a LogSqsStep resource.
     * @param {LogSqsStepApiLogSqsStepsIdGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogSqsStepApi
     */
    public logSqsStepsIdGet(requestParameters: LogSqsStepApiLogSqsStepsIdGetRequest, options?: AxiosRequestConfig) {

        return LogSqsStepApiFp(this.configuration).logSqsStepsIdGet(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }
}

