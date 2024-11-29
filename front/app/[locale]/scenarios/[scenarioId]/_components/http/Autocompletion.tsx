import { useApiDocumentations } from "@/app/_hooks/useApiDocumentations";
import ApiDocumentationCombobox from "@/components/shared-components/ApiDocumentation/ApiDocumentationCombobox";
import ApiDocumentationMethodCombobox from "@/components/shared-components/ApiDocumentation/ApiDocumentationMethodCombobox";
import ApiDocumentationPathCombobox from "@/components/shared-components/ApiDocumentation/ApiDocumentationPathCombobox";
import { Button } from "@/components/ui/button";
import { ApiDocumentation, HttpStepMethodEnum } from "@/services";
import _ from "lodash";
import { ListChecks } from "lucide-react";
import { useState } from "react";
import DrawerDialog from "@/components/shared-components/Card/DrawerDialog";
import { useTranslations } from "next-intl";
import { useStep } from "@/app/_hooks/useStep";
import { HttpStepAppTyped, StepTypeEnum } from "@/app/_type/Step";
import { setSearchParams } from "@/lib/utils";

export const BASE_URL_VARIABLE_NAME = 'base_url';

export default function Autocompletion() {
    const [open, setOpen] = useState<boolean>(false);
    const tAutocompletion = useTranslations('api_documentations.autocompletion.form');

    const { getFile, currentApiDocumentationFile } = useApiDocumentations();
    const { currentStep, updateStep, scenario } = useStep();

    const [path, setPath] = useState<any>(null);
    const [method, setMethod] = useState<string | null>(null);

    const onSelectApiDocumentation = async (apiDocumentation: ApiDocumentation) => {
        await getFile(apiDocumentation);
    };

    const onSelectPath = async (selectedPath: any) => {
        setPath(selectedPath);
        setMethod(null);
    };

    const onSelectMethod = async (method: string) => {
        setMethod(method);
    };

    const handleAutocompletion = () => {
        if (currentStep && currentStep.type === StepTypeEnum.HttpStep) {
            const selectedMethod = (method?.toUpperCase()) as HttpStepMethodEnum;
            const selectedPath = Object.keys(path)[0];
            const origin = (new URL(currentApiDocumentationFile?.url ?? '')).origin;
            const url = `<<v:scenario:${BASE_URL_VARIABLE_NAME} or '${origin}'>>${selectedPath}`;

            createBaseUrlVariable(origin);
            
            const methodDetails = path[Object.keys(path)[0]][method ?? ''];

            let { updatedUrl, variables } = discoverParameters(methodDetails.parameters, url);
            let headers = discoverAuthorization(methodDetails.responses).headers;
            const { checkConditions } = discoverCheckConditions(methodDetails.responses);
            const { content, updatedHeaders, updatedVariables } = discoverRequestBody(methodDetails.requestBody, headers, variables);
            headers = { ...headers, ...updatedHeaders };
            variables = { ...variables, ...updatedVariables };

            const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;

            const updatedStep: HttpStepAppTyped = {
                ...currentStep,
                method: selectedMethod,
                url: updatedUrl,
                headers,
                content: parsedContent,
                checkConditions,
                variables,
            };

            updateStep(updatedStep);
            setOpen(false);
        }
    }

    const createBaseUrlVariable = (baseUrl: string) => {
        if(!_.isUndefined(scenario.variables) && _.isUndefined(scenario.variables[BASE_URL_VARIABLE_NAME])) {
            scenario.variables[BASE_URL_VARIABLE_NAME] = baseUrl;
        }
    }

    const discoverRequestBody = (requestBody: any, headers: any, variables: any) => {
        let content: { [key: string]: string } = {};

        if (_.isUndefined(requestBody) || !requestBody.required) {
            return { content, headers };
        }

        const contentType = Object.keys(requestBody.content)[0];
        headers['Content-Type'] = contentType;

        const properties = requestBody.content[contentType].schema.properties;
        for (const key in properties) {
            let value = properties[key];
            content[key] = `<<v:steps[${currentStep?.stepNumber}]:${key} or ''>>`;
            variables[key] = (!_.isUndefined(value.example) && !_.isNull(value.example)) ? value.example : '';
        }

        return {
            content: JSON.stringify(content, null, 2),
            updatedHeaders: headers,
            updatedVariables: variables
        };
    };


    const discoverCheckConditions = (responses: any[]) => {
        let checkConditions: { [key: string]: string } = {};
        const statusCode = Object.keys(responses).filter(k => k.startsWith('2'))

        if (statusCode) {
            checkConditions['statusCode'] = statusCode[0];
        }

        return { checkConditions };
    }

    const discoverAuthorization = (responses: any[]) => {
        let headers: { [key: string]: string } = {};

        if (Object.keys(responses).indexOf('401') > -1) {
            headers['Authorization'] = ''
        }

        return { headers };
    }

    const discoverParameters = (parameters: any[], url: string) => {
        let updatedUrl = url;
        let queryParameters: { [key: string]: string } = {};
        let variables: { [key: string]: string } = {};

        parameters?.forEach((param: any) => {
            if (param.in === 'query') {
                queryParameters[param.name] = `<<v:steps[${currentStep?.stepNumber}]:${param.name} or ''>>`;
                variables[param.name] = ''
            } else if (param.in === 'path') {
                updatedUrl = updatedUrl.replace(`{${param.name}}`, `<<v:steps[${currentStep?.stepNumber}]:${param.name} or ''>>`);
                variables[param.name] = '';
            }
        });

        if (Object.keys(queryParameters).length > 0) {
            updatedUrl = setSearchParams(updatedUrl, queryParameters);
        }
        return { updatedUrl, variables };
    }

    return (
        <DrawerDialog
            open={open}
            setOpen={setOpen}
            triggerChildren={
                <div className="flex justify-start items-center gap-2 w-fit">
                    <ListChecks color="grey" className="h-4 w-4" />
                    <h1 className="text-xs font-bold" style={{ color: 'grey' }}>
                        {tAutocompletion('cta')}
                    </h1>
                </div>
            }
            headerTitleChildren={
                <div className="w-full h-full flex items-center space-x-2">
                    <ListChecks className="h-5 w-7" />
                    <h1 className="text-xl font-bold">{tAutocompletion('title')}</h1>
                </div>
            }
            footerChildren={
                <div className="p-4 flex flex-col gap-1">
                    <div className="flex flex-col items-start gap-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold">{tAutocompletion('documentation.title')}</p>
                            <ApiDocumentationCombobox onSelect={onSelectApiDocumentation} />
                        </div>
                        {
                            (!_.isEmpty(currentApiDocumentationFile))
                            && (
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-semibold">{tAutocompletion('path.title')}</p>
                                    <ApiDocumentationPathCombobox path={path} onSelect={onSelectPath} />
                                </div>
                            )
                        }
                        {
                            (!_.isEmpty(path))
                            && (
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-semibold">{tAutocompletion('method.title')}</p>
                                    <ApiDocumentationMethodCombobox path={path} method={method} onSelect={onSelectMethod} />
                                </div>
                            )
                        }
                        {
                            (!_.isEmpty(method))
                            && (

                                <div className="w-full flex justify-center">
                                    <Button
                                        variant="default"
                                        role="combobox"
                                        className="justify-between"
                                        onClick={handleAutocompletion}
                                    >
                                        <ListChecks className="mr-2 h-4 w-4" />
                                        {tAutocompletion('validation')}
                                    </Button>
                                </div>
                            )
                        }
                    </div>
                </div>
            }
        />
    )
}
