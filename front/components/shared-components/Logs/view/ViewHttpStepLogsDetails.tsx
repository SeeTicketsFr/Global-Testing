import { LogHttpStepJsonld } from "@/services";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabsModern";
import { CodeBlock, dracula } from "react-code-blocks";
import { useTranslations } from "next-intl";

interface ViewHttpStepLogsDetailsProps {
    log: {
        step: LogHttpStepJsonld;
    };
}

export function ViewHttpStepLogsDetails(props: ViewHttpStepLogsDetailsProps) {
    const { log } = props;
    const { step } = log;
    const { response: _, ...request } = step;

    const tExecutions = useTranslations('executions.view');

    return (
        <Tabs defaultValue="request" >
            <TabsList className="grid w-full grid-cols-2">  
                <TabsTrigger value="request">{tExecutions('request')}</TabsTrigger>
                <TabsTrigger value="response">{tExecutions('response')}</TabsTrigger>
            </TabsList>
            <TabsContent value="request" className="drop-shadow-none w-[40vw]">
                <CodeBlock
                    text={JSON.stringify(request, null, 2)}
                    language={'json'}
                    showLineNumbers={false}
                    theme={dracula}
                />
            </TabsContent>
            <TabsContent value="response" className="drop-shadow-none w-[40vw]">
                <CodeBlock
                    text={JSON.stringify(log.step?.response, null, 2)}
                    language={'json'}
                    showLineNumbers={false}
                    theme={dracula}
                />
            </TabsContent>
        </Tabs>
    )
}