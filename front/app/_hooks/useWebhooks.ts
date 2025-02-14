import { useSetAtom, useAtomValue } from 'jotai';
import { addWebhook, deleteWebhook, getWebhookById, updateWebhook } from '../_store/Webhook';
import { webhooksAtom } from '@/lib/atoms';
import { Webhook, WebhookJsonldWebhookRead } from '@/services';
export function useWebhooks() {
    const setWebhooks = useSetAtom(webhooksAtom);
    const webhooks = useAtomValue(webhooksAtom);

    const get = async (idScenario: string, page = 1, itemsPerPage = 10) => {
        const { data, totalItems, totalPages } = await getWebhookById(idScenario, page, itemsPerPage);
    
        const formattedData: Webhook[] = data.map((webhook: WebhookJsonldWebhookRead) => ({
            id: webhook.id,
            scenario: idScenario,
            eventType: webhook.eventType,
            url: webhook.url
        }));
    
        setWebhooks(formattedData);
        return { data: formattedData, totalItems, totalPages };
    };
    

    const add = async (webhook: any) => {
        const response = await addWebhook({ data: webhook });
        if (response) {
            const formattedWebhook: Webhook = {
                id: response.data.id,
                scenario: webhook.scenario,
                eventType: response.data.eventType,
                url: response.data.url
            };
    
            const newWebhooks = [...webhooks, formattedWebhook];
            setWebhooks(newWebhooks);
        }
        return response;
    };
    

    const del = async (id: string) => {
        const response = await deleteWebhook(id);
        if (response) {
            const updatedDocumentations = webhooks.filter((webhook: Webhook) => webhook.id !== id);
            setWebhooks(updatedDocumentations);
        }
        return response;
    }

    const update = async (id: string, updatedData: any) => {
        const response = await updateWebhook({ id, data: updatedData });
        if (response) {
            const updatedDocumentations = webhooks.map((webhook: Webhook) =>
                webhook.id === id ? { ...webhook, ...updatedData } : webhook
            );
            setWebhooks(updatedDocumentations);
        }
        return response;
    }

    return { webhooks, get, add, del, update };
}
