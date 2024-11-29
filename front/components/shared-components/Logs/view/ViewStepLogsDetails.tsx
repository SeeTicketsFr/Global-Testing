import { LogHttpStepJsonld, LogLoopStepJsonld, LogSleepStepJsonld, LogSqsStepJsonld } from "@/services";
import { ViewHttpStepLogsDetails } from "@/components/shared-components/Logs/view/ViewHttpStepLogsDetails";
import { LogStepTypeEnum } from "@/app/_type/LogStep";
import { ViewSleepStepLogsDetails } from "@/components/shared-components/Logs/view/ViewSleepStepLogsDetails";
import { ViewLoopStepLogsDetails } from "@/components/shared-components/Logs/view/ViewLoopStepLogsDetails";
import _ from "lodash";
import { ViewSqsStepLogsDetails } from "./ViewSqsStepLogsDetails";

interface ViewStepLogsDetailsProps {
    log: any;
}

export function ViewStepLogsDetails(props: ViewStepLogsDetailsProps) {
    const { log } = props;

    return (
        <>
            {!_.isUndefined(log.step) && !_.isNull(log.step) && (
                <>
                    {log.step['@type'] === LogStepTypeEnum.LogHttpStep && (
                        <ViewHttpStepLogsDetails log={{ ...log, step: log.step as LogHttpStepJsonld }} />
                    )}
                    {log.step['@type'] === LogStepTypeEnum.LogSleepStep && (
                        <ViewSleepStepLogsDetails log={{ ...log, step: log.step as LogSleepStepJsonld }} />
                    )}
                    {log.step['@type'] === LogStepTypeEnum.LogLoopStep && (
                        <ViewLoopStepLogsDetails log={{ ...log, step: log.step as LogLoopStepJsonld }} />
                    )}
                    {log.step['@type'] === LogStepTypeEnum.LogSqsStep && (
                        <ViewSqsStepLogsDetails log={{ ...log, step: log.step as LogSqsStepJsonld }} />
                    )}
                </>
            )}
        </>
    );
}
