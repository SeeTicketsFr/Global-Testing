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



/**
 * 
 * @export
 * @interface SqsStep
 */
export interface SqsStep {
    /**
     * 
     * @type {string}
     * @memberof SqsStep
     */
    'scenario': string;
    /**
     * 
     * @type {string}
     * @memberof SqsStep
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof SqsStep
     */
    'name': string;
    /**
     * 
     * @type {number}
     * @memberof SqsStep
     */
    'stepNumber': number;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof SqsStep
     */
    'variables'?: { [key: string]: string; };
    /**
     * 
     * @type {boolean}
     * @memberof SqsStep
     */
    'runAfterFailure'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof SqsStep
     */
    'url'?: string;
    /**
     * 
     * @type {string}
     * @memberof SqsStep
     */
    'region'?: string;
    /**
     * 
     * @type {string}
     * @memberof SqsStep
     */
    'accessKey'?: string;
    /**
     * 
     * @type {string}
     * @memberof SqsStep
     */
    'secretKey'?: string;
    /**
     * 
     * @type {string}
     * @memberof SqsStep
     */
    'messageGroupId'?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof SqsStep
     */
    'content'?: Array<string>;
}
