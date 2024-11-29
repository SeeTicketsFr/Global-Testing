import { Log } from "@/services"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
  
import {
    Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import _ from "lodash";
import { ChevronDown, CircleCheck, CircleX } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabsModern";
import { CodeBlock, dracula } from "react-code-blocks";
import { ViewStepLogsDetails } from "./ViewStepLogsDetails";
import { TextWithTitle } from "../../Text/TextWithTitle";
import { useTranslations } from "next-intl";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";

interface ViewExecutionProps {
    data: Log[]
}

function calculateDuration(startDate: Date, endDate: Date) {
    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;
    
    return `${hours}h ${minutes}m ${seconds}s`;
}

export function ViewExecution(props: ViewExecutionProps) {
    const { data } = props;

    const tExecutions = useTranslations('executions.view');

    const errorLogs = _.filter(data, (log: Log) => {
        return !_.isUndefined(log.step) && !_.isUndefined(log.step?.error) && !_.isNull(log.step.error);
    });

    const stepLogs = _.filter(data, (log: Log) => {
        return !_.isUndefined(log.step) && !_.isNull(log.step);
    });

    const dates = data
        .map(log => log.createdAt ? new Date(log.createdAt) : undefined)  // Convertir les strings en Date
        .filter((date): date is Date => date instanceof Date && !isNaN(date.getTime())); // Filtrer les valeurs invalides
    const firstLogDate = _.min(dates);
    const lastLogDate = _.max(dates);
    const totalDuration = firstLogDate && lastLogDate ? calculateDuration(firstLogDate, lastLogDate) : tExecutions('not_available');


    const columns = [
        {
            name: tExecutions('columns.id'),
        },
        {
            name: tExecutions('columns.name'),
        },
        {
            name: tExecutions('columns.status'),
        },
        {
            name: '',
        }
    ];

    const formattedData = (data || []).map(({ createdAt, humanDescription }) => {
        const formattedDate = createdAt?.toLocaleString();
        return `[${formattedDate}] ${humanDescription}`;
    }).join('\n');

    return (
        <div className="w-full sm:p-4 space-y-4">
            <section className="flex justify-center items-center gap-8">
                {errorLogs.length >= 1 ? (
                    <Badge variant="destructive" className="w-fit flex justify-center items-center gap-2">
                        <CircleX color="#d75b5b" />
                        <h1 className="text-sm text-red-400">{tExecutions('failure')}</h1>
                    </Badge>
                ) : (
                    <Badge className="w-fit flex justify-center items-center gap-2 bg-green-800">
                        <CircleCheck color="#51d271" />
                        <h1 className="text-green-400">{tExecutions('successful')}</h1>
                    </Badge>
                )}
                <TextWithTitle
                    title={tExecutions('total_duration')}
                    value={totalDuration}
                />
            </section>
            <Tabs defaultValue="simple" >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="simple">{tExecutions('simple')}</TabsTrigger>
                    <TabsTrigger value="detailed">{tExecutions('detailed')}</TabsTrigger>
                </TabsList>
                <TabsContent value="simple" className="drop-shadow-none w-[40vw] max-h-[50vh] overflow-y-auto">
                    <CodeBlock
                        text={formattedData}
                        language={'text'}
                        showLineNumbers={true}
                        theme={dracula}
                    />
                </TabsContent>
                <TabsContent value="detailed">
                        <div className="rounded-md sm:border max-h-[50vh] overflow-y-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableHead key={column.name} className="font-medium">{column.name}</TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stepLogs ? (
                                        stepLogs.map((log) => (
                                            <Collapsible key={log.id} asChild>
                                            <>
                                                <TableRow>
                                                    <TableCell>{log.step?.id}</TableCell>
                                                    <TableCell>{log.step?.name}</TableCell>
                                                    <TableCell>
                                                        {_.isUndefined(log.step?.error) || _.isNull(log.step?.error) ? (
                                                            <CircleCheck color="#51d271" />
                                                            ) : (
                                                            <CircleX color="#d75b5b" />
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <CollapsibleTrigger asChild>
                                                            <ChevronDown />
                                                        </CollapsibleTrigger>
                                                    </TableCell>
                                                </TableRow>
                                                <CollapsibleContent asChild>
                                                    <TableRow>
                                                        <TableCell colSpan={4}>
                                                            <ViewStepLogsDetails log={log} />
                                                        </TableCell>
                                                    </TableRow>
                                                </CollapsibleContent>
                                            </>
                                            </Collapsible>
                                    ))
                                    ) : null}
                                </TableBody>
                            </Table>
                        </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}