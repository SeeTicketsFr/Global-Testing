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
 * @interface ConditionJsonldLoopstepReadStepRead
 */
export interface ConditionJsonldLoopstepReadStepRead {
    /**
     * 
     * @type {AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsReadContext}
     * @memberof ConditionJsonldLoopstepReadStepRead
     */
    '@context'?: AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsReadContext;
    /**
     * 
     * @type {string}
     * @memberof ConditionJsonldLoopstepReadStepRead
     */
    '@id'?: string;
    /**
     * 
     * @type {string}
     * @memberof ConditionJsonldLoopstepReadStepRead
     */
    '@type'?: string;
    /**
     * 
     * @type {string}
     * @memberof ConditionJsonldLoopstepReadStepRead
     */
    'dynamicValue': string;
    /**
     * 
     * @type {any}
     * @memberof ConditionJsonldLoopstepReadStepRead
     */
    'defaultValue'?: any;
    /**
     * 
     * @type {any}
     * @memberof ConditionJsonldLoopstepReadStepRead
     */
    'value': any;
}

