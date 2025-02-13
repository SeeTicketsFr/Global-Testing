import { useSetAtom, useAtomValue } from 'jotai';
import { addWebhook, deleteWebhook, getWebhookById, getWebhooks, updateWebhook } from '../_store/Webhook';
import { webhooksAtom } from '@/lib/atoms';
import { Webhook } from '@/services';
export function useWebhooks() {
    const setWebhooks = useSetAtom(webhooksAtom);
    const webhooks = useAtomValue(webhooksAtom);

    const get = async (idScenario: string, page = 1, itemsPerPage = 10) => {
        const { data, totalItems, totalPages } = await getWebhookById(idScenario, page, itemsPerPage);
        setWebhooks(data);
        return { data, totalItems, totalPages };
    }

    const add = async (apiDocumentation: Webhook) => {
        const response = await addWebhook({ data: apiDocumentation });
        if (response) {
            const newDocumentations = [...webhooks, response.data];
            setWebhooks(newDocumentations);
        }
        return response;
    }

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
