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
// May contain unused imports in some cases
// @ts-ignore
import { ConditionJsonldLoopstepReadStepRead } from './condition-jsonld-loopstep-read-step-read';

/**
 * 
 * @export
 * @interface LoopStepJsonldLoopstepReadStepRead
 */
export interface LoopStepJsonldLoopstepReadStepRead {
    /**
     * 
     * @type {AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsReadContext}
     * @memberof LoopStepJsonldLoopstepReadStepRead
     */
    '@context'?: AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsReadContext;
    /**
     * 
     * @type {string}
     * @memberof LoopStepJsonldLoopstepReadStepRead
     */
    '@id'?: string;
    /**
     * 
     * @type {string}
     * @memberof LoopStepJsonldLoopstepReadStepRead
     */
    '@type'?: string;
    /**
     * 
     * @type {string}
     * @memberof LoopStepJsonldLoopstepReadStepRead
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof LoopStepJsonldLoopstepReadStepRead
     */
    'name': string;
    /**
     * 
     * @type {number}
     * @memberof LoopStepJsonldLoopstepReadStepRead
     */
    'stepNumber': number;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof LoopStepJsonldLoopstepReadStepRead
     */
    'variables'?: { [key: string]: string; };
    /**
     * 
     * @type {boolean}
     * @memberof LoopStepJsonldLoopstepReadStepRead
     */
    'runAfterFailure'?: boolean;
    /**
     * 
     * @type {Array<ConditionJsonldLoopstepReadStepRead>}
     * @memberof LoopStepJsonldLoopstepReadStepRead
     */
    'conditions'?: Array<ConditionJsonldLoopstepReadStepRead>;
    /**
     * 
     * @type {number}
     * @memberof LoopStepJsonldLoopstepReadStepRead
     */
    'stepToReturn'?: number;
}
