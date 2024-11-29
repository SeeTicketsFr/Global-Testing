import { useEffect, useState } from "react";
import DrawerDialog from "../Card/DrawerDialog";
import { CirclePlay } from "lucide-react";
import { useTranslations } from "next-intl";
import { CodeBlock, dracula } from "react-code-blocks";
import { Log } from "@/services";
import { getLogsByExecutionId } from "@/app/_store/Execution";
import _ from "lodash";
import { ViewExecution } from "./view/ViewExecution";

interface ScenarioExecutionDrawerDialogProps {
    idExecution: string;
    setIdExecution: React.Dispatch<React.SetStateAction<string|null|undefined>>;
  }

export function ScenarioExecutionDrawerDialog({ idExecution, setIdExecution }: ScenarioExecutionDrawerDialogProps) {
    const tExecutions = useTranslations('executions');
    const [data, setData] = useState<Log[]|null>(null);

    useEffect(() => {
        const fetchData = async () => {
          const executions = await getLogsByExecutionId({ idExecution: idExecution });
          setData(executions);
        };
        fetchData();
      }, [idExecution]);
    
    return (
        <DrawerDialog
            open
            setOpen={() => {
                setIdExecution(null);
            }}
            headerTitleChildren={
                <section className="flex items-center gap-2 p-4">
                    <CirclePlay />
                    <h1 className="text-xl font-bold">{tExecutions('execution')}</h1>
                </section>
            }
            footerChildren={
                <div>
                    {!_.isNull(data) ? (
                        <ViewExecution data={data} />
                    ) : (
                        <h1>{tExecutions('loading')}</h1>
                    )}
                </div>
            }
        />
    )
}