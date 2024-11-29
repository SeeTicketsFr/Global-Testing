import { CirclePlay, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { CodeBlock, dracula } from 'react-code-blocks';
import DrawerDialog from "../Card/DrawerDialog";
import MercureSubscriber from "./MercureSubscriber";
import { useAtom } from "jotai";
import { currentScenarioExecution } from "@/lib/atoms";
import _ from "lodash";
import { useRef } from "react";
import { DialogConfirmation } from "../Card/DialogConfirmation";
import { runScenario } from "@/app/_store/Scenarios";
import { toast } from "@/components/ui/use-toast";
import { buttonVariants } from "@/components/ui/button";
import { Scenario } from "@/app/_type/Scenario";
import { ViewExecution } from "./view/ViewExecution";
import { Log } from "@/services";

export default function ScenarioExecution(scenario: Scenario) {
    const { id, name } = scenario;

    const tExecutions = useTranslations('executions');
    const [scenarioExecution, setScenarioExecution] = useAtom(currentScenarioExecution);
    const eventSourceRef = useRef<EventSource | null>(null);
    const tScenario = useTranslations('scenario');
    const tConfirmation = useTranslations('scenario.confirmation');
    const tErrors = useTranslations('errors');

    const handleRun = () => {
        runScenario({scenarioId: id})
        .then((response) => {
            toast({
                title: tScenario('runTitle'),
                description: tScenario('runDescription', { scenarioName: name }),
            });
            setScenarioExecution({
                ...scenario,
                executionId: response.executionId,
                logs: []
            });
        })
        .catch((error) => {
            console.error(tErrors('default') + error);
        });
    }

    return (
        <>
            <DialogConfirmation
                translationPath='scenario'
                description={tConfirmation('confirmationRunDescription')}
                handleSubmit={() => handleRun()}
                triggerChildren={
                    <div className={buttonVariants()}>
                        <span>{tScenario('run')}</span>
                        <Play className="h-4 w-4" />
                    </div>
                }
            />
            {!_.isNull(scenarioExecution) && (
                <MercureSubscriber
                    eventSourceRef={eventSourceRef}
                    update={(updatedData: Log) => {
                        setScenarioExecution(prev => {
                            if (!prev) return prev;
                            return {
                                ...prev,
                                logs: [
                                    ...(prev.logs || []),
                                    updatedData,
                                ]
                            };
                        });
                    }}
                    hub={`${process.env['NEXT_PUBLIC_API_PUBLIC_URL']}/.well-known/mercure`}
                    topic={`${process.env['NEXT_PUBLIC_API_PUBLIC_URL']}/api/logs/${scenarioExecution?.executionId}`}>
                    {!scenarioExecution ? null : (
                        <DrawerDialog
                            open={!_.isNull(scenarioExecution)}
                            setOpen={() => {
                                setScenarioExecution(null);
                                if (eventSourceRef.current) {
                                    eventSourceRef.current.close();
                                }
                            }}
                            headerTitleChildren={
                                <section className="flex items-center gap-2 p-4">
                                    <CirclePlay />
                                    <h1 className="text-xl font-bold">{tExecutions('execution')}</h1>
                                </section>
                            }
                            footerChildren={
                                <ViewExecution data={scenarioExecution.logs} />
                            }
                        />
                    )}
                </MercureSubscriber>
            )}
        </>
    );
}
