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
import { AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead } from './abstract-step-jsonld-scenario-read-step-read-httpstep-read-loopstep-read-sleepstep-read-sqsstep-read-metrics-read';
// May contain unused imports in some cases
// @ts-ignore
import { AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsReadContext } from './abstract-step-jsonld-scenario-read-step-read-httpstep-read-loopstep-read-sleepstep-read-sqsstep-read-metrics-read-context';
// May contain unused imports in some cases
// @ts-ignore
import { ScenarioMetricsJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead } from './scenario-metrics-jsonld-scenario-read-step-read-httpstep-read-loopstep-read-sleepstep-read-sqsstep-read-metrics-read';

/**
 * 
 * @export
 * @interface ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
 */
export interface ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead {
    /**
     * 
     * @type {AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsReadContext}
     * @memberof ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    '@context'?: AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsReadContext;
    /**
     * 
     * @type {string}
     * @memberof ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    '@id'?: string;
    /**
     * 
     * @type {string}
     * @memberof ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    '@type'?: string;
    /**
     * 
     * @type {string}
     * @memberof ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    'name': string;
    /**
     * 
     * @type {Array<AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead>}
     * @memberof ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    'steps'?: Array<AbstractStepJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead>;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    'variables'?: { [key: string]: string; };
    /**
     * 
     * @type {string}
     * @memberof ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    'cron'?: string | null;
    /**
     * 
     * @type {ScenarioMetricsJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead}
     * @memberof ScenarioJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead
     */
    'metrics'?: ScenarioMetricsJsonldScenarioReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepReadMetricsRead | null;
}

