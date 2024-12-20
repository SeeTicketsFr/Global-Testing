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
import { AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsReadContext } from './abstract-step-jsonld-scenario-read-step-read-httpstep-read-loopstep-read-sleepstep-read-sqsstep-read-metrics-read-context';

/**
 * 
 * @export
 * @interface SqsStepJsonldSqsstepReadStepRead
 */
export interface SqsStepJsonldSqsstepReadStepRead {
    /**
     * 
     * @type {AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsReadContext}
     * @memberof SqsStepJsonldSqsstepReadStepRead
     */
    '@context'?: AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsReadContext;
    /**
     * 
     * @type {string}
     * @memberof SqsStepJsonldSqsstepReadStepRead
     */
    '@id'?: string;
    /**
     * 
     * @type {string}
     * @memberof SqsStepJsonldSqsstepReadStepRead
     */
    '@type'?: string;
    /**
     * 
     * @type {string}
     * @memberof SqsStepJsonldSqsstepReadStepRead
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof SqsStepJsonldSqsstepReadStepRead
     */
    'name': string;
    /**
     * 
     * @type {number}
     * @memberof SqsStepJsonldSqsstepReadStepRead
     */
    'stepNumber': number;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof SqsStepJsonldSqsstepReadStepRead
     */
    'variables'?: { [key: string]: string; };
    /**
     * 
     * @type {boolean}
     * @memberof SqsStepJsonldSqsstepReadStepRead
     */
    'runAfterFailure'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof SqsStepJsonldSqsstepReadStepRead
     */
    'url'?: string;
    /**
     * 
     * @type {string}
     * @memberof SqsStepJsonldSqsstepReadStepRead
     */
    'region'?: string;
    /**
     * 
     * @type {string}
     * @memberof SqsStepJsonldSqsstepReadStepRead
     */
    'accessKey'?: string;
    /**
     * 
     * @type {string}
     * @memberof SqsStepJsonldSqsstepReadStepRead
     */
    'secretKey'?: string;
    /**
     * 
     * @type {string}
     * @memberof SqsStepJsonldSqsstepReadStepRead
     */
    'messageGroupId'?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof SqsStepJsonldSqsstepReadStepRead
     */
    'content'?: Array<string>;
}

