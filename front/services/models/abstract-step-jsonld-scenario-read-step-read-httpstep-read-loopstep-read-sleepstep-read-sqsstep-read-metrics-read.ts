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
 * @interface AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
 */
export interface AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead {
    /**
     * 
     * @type {AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsReadContext}
     * @memberof AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    '@context'?: AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsReadContext;
    /**
     * 
     * @type {string}
     * @memberof AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    '@id'?: string;
    /**
     * 
     * @type {string}
     * @memberof AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    '@type'?: string;
    /**
     * 
     * @type {string}
     * @memberof AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    'name': string;
    /**
     * 
     * @type {number}
     * @memberof AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    'stepNumber': number;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    'variables'?: { [key: string]: string; };
    /**
     * 
     * @type {boolean}
     * @memberof AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    'runAfterFailure'?: boolean;
}

