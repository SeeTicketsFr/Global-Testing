import { LogSleepStepJsonld } from "@/services";
import { CodeBlock, dracula } from "react-code-blocks";

interface ViewSleepStepLogsDetailsProps {
    log: {
        step: LogSleepStepJsonld;
    };
}

export function ViewSleepStepLogsDetails(props: ViewSleepStepLogsDetailsProps) {
    const { log } = props;
    const { step } = log;

    return (
        <section className="drop-shadow-none w-[40vw]">
            <CodeBlock
                text={JSON.stringify(step, null, 2)}
                language={'json'}
                showLineNumbers={false}
                theme={dracula}
            />
        </section>
    )
}