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
import { LogAbstractStepJsonldLogReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepRead } from './log-abstract-step-jsonld-log-read-step-read-httpstep-read-loopstep-read-sleepstep-read-sqsstep-read';

/**
 * 
 * @export
 * @interface LogJsonldLogReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepRead
 */
export interface LogJsonldLogReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepRead {
    /**
     * 
     * @type {string}
     * @memberof LogJsonldLogReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepRead
     */
    '@id'?: string;
    /**
     * 
     * @type {string}
     * @memberof LogJsonldLogReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepRead
     */
    '@type'?: string;
    /**
     * 
     * @type {string}
     * @memberof LogJsonldLogReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepRead
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof LogJsonldLogReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepRead
     */
    'idExecution': string;
    /**
     * 
     * @type {string}
     * @memberof LogJsonldLogReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepRead
     */
    'idScenario': string;
    /**
     * 
     * @type {string}
     * @memberof LogJsonldLogReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepRead
     */
    'idStep': string;
    /**
     * 
     * @type {string}
     * @memberof LogJsonldLogReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepRead
     */
    'humanDescription': string;
    /**
     * 
     * @type {LogAbstractStepJsonldLogReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepRead}
     * @memberof LogJsonldLogReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepRead
     */
    'step'?: LogAbstractStepJsonldLogReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepRead;
    /**
     * 
     * @type {string}
     * @memberof LogJsonldLogReadStepReadHttpstepReadLoopstepReadSleepstepReadSqsstepRead
     */
    'createdAt'?: string;
}
