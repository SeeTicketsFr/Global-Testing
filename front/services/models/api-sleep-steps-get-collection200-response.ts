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


// May contain unused imports in some cases
// @ts-ignore
import { ApiApiDocumentationsGetCollection200ResponseHydraSearch } from './api-api-documentations-get-collection200-response-hydra-search';
// May contain unused imports in some cases
// @ts-ignore
import { ApiApiDocumentationsGetCollection200ResponseHydraView } from './api-api-documentations-get-collection200-response-hydra-view';
// May contain unused imports in some cases
// @ts-ignore
import { SleepStepJsonldSleepstepReadStepRead } from './sleep-step-jsonld-sleepstep-read-step-read';

/**
 * 
 * @export
 * @interface ApiSleepStepsGetCollection200Response
 */
export interface ApiSleepStepsGetCollection200Response {
    /**
     * 
     * @type {Array<SleepStepJsonldSleepstepReadStepRead>}
     * @memberof ApiSleepStepsGetCollection200Response
     */
    'hydra:member': Array<SleepStepJsonldSleepstepReadStepRead>;
    /**
     * 
     * @type {number}
     * @memberof ApiSleepStepsGetCollection200Response
     */
    'hydra:totalItems'?: number;
    /**
     * 
     * @type {ApiApiDocumentationsGetCollection200ResponseHydraView}
     * @memberof ApiSleepStepsGetCollection200Response
     */
    'hydra:view'?: ApiApiDocumentationsGetCollection200ResponseHydraView;
    /**
     * 
     * @type {ApiApiDocumentationsGetCollection200ResponseHydraSearch}
     * @memberof ApiSleepStepsGetCollection200Response
     */
    'hydra:search'?: ApiApiDocumentationsGetCollection200ResponseHydraSearch;
}

