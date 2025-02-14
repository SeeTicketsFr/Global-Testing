import { Scenario } from "@/app/_type/Scenario";
import AddWebhook from "./AddWebhook";
import { WebhooksTable } from "./WebhooksTable";
import { StepsAppTyped } from "@/app/_type/Step";

interface WebhooksProps {
    obj: StepsAppTyped | Scenario | null;
}

export default function Webhooks({ obj }: WebhooksProps) {
    return (
        <section className="flex flex-col items-center gap-4">
            {obj && obj.id && (
                <>
                    <AddWebhook idScenario={obj.id} webhook={null} setWebhook={null} />
                    <WebhooksTable idScenario={obj.id} />
                </>
            )}
        </section>
    )
}
