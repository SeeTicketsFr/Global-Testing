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
import { LogSleepStepJsonld } from '../models';
/**
 * LogSleepStepApi - axios parameter creator
 * @export
 */

export const LogSleepStepApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Retrieves a LogSleepStep resource.
         * @summary Retrieves a LogSleepStep resource.
         * @param {string} id LogSleepStep identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
            logSleepStepsIdGet: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('logSleepStepsIdGet', 'id', id)
            const localVarPath = `/api/log_sleep_steps/{id}`
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
 * LogSleepStepApi - functional programming interface
 * @export
 */
export const LogSleepStepApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LogSleepStepApiAxiosParamCreator(configuration)
    return {
        /**
         * Retrieves a LogSleepStep resource.
         * @summary Retrieves a LogSleepStep resource.
         * @param {string} id LogSleepStep identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */


        async logSleepStepsIdGet(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LogSleepStepJsonld>> {
                const localVarAxiosArgs = await localVarAxiosParamCreator.logSleepStepsIdGet(id, options);

            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * Request parameters for logSleepStepsIdGet operation in LogSleepStepApi.
 * @export
 * @interface LogSleepStepApiLogSleepStepsIdGetRequest
 */
export interface LogSleepStepApiLogSleepStepsIdGetRequest {
    /**
     * LogSleepStep identifier
     * @type {string}
     * @memberof LogSleepStepApiLogSleepStepsIdGet
     */
    readonly id: string
}
/**
 * LogSleepStepApi - object-oriented interface
 * @export
 * @class LogSleepStepApi
 * @extends {BaseAPI}
 */
export class LogSleepStepApi extends BaseAPI {
    /**
     * Retrieves a LogSleepStep resource.
     * @summary Retrieves a LogSleepStep resource.
     * @param {LogSleepStepApiLogSleepStepsIdGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogSleepStepApi
     */
    public logSleepStepsIdGet(requestParameters: LogSleepStepApiLogSleepStepsIdGetRequest, options?: AxiosRequestConfig) {

        return LogSleepStepApiFp(this.configuration).logSleepStepsIdGet(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }
}

