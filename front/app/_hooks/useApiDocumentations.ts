import { useSetAtom, useAtomValue } from 'jotai';
import { apiDocumentationsAtom, currentApiDocumentationFileAtom } from "@/lib/atoms";
import { addApiDocumentation, deleteApiDocumentation, getApiDocumentationFile, getApiDocumentations, updateApiDocumentation } from '../_store/ApiDocumentations';
import { ApiDocumentation } from '@/services';

export function useApiDocumentations() {
    const setApiDocumentations = useSetAtom(apiDocumentationsAtom);
    const apiDocumentations = useAtomValue(apiDocumentationsAtom);
    const setCurrentApiDocumentationFile = useSetAtom(currentApiDocumentationFileAtom);
    const currentApiDocumentationFile = useAtomValue(currentApiDocumentationFileAtom);

    const getAll = async (page = 1, itemsPerPage = 10) => {
        const { data, totalItems, totalPages } = await getApiDocumentations(page, itemsPerPage);
        setApiDocumentations(data);
        return { data, totalItems, totalPages };
    }

    const add = async (apiDocumentation: ApiDocumentation) => {
        const response = await addApiDocumentation({ data: apiDocumentation });
        if (response) {
            const newDocumentations = [...apiDocumentations, response.data];
            setApiDocumentations(newDocumentations);
        }
        return response;
    }

    const del = async (id: string) => {
        const response = await deleteApiDocumentation(id);
        if (response) {
            const updatedDocumentations = apiDocumentations.filter(doc => doc.id !== id);
            setApiDocumentations(updatedDocumentations);
        }
        return response;
    }

    const update = async (id: string, updatedData: any) => {
        const response = await updateApiDocumentation({ id, data: updatedData });
        if (response) {
            const updatedDocumentations = apiDocumentations.map(doc =>
                doc.id === id ? { ...doc, ...updatedData } : doc
            );
            setApiDocumentations(updatedDocumentations);
        }
        return response;
    }

    const getFile = async (apiDocumentation: ApiDocumentation) => {
        const response = await getApiDocumentationFile(apiDocumentation.id ?? '');
        if(response) {
            setCurrentApiDocumentationFile({ ...apiDocumentation, file: response });
        }
        return response;
    }

    return { apiDocumentations, getAll, add, del, update, currentApiDocumentationFile ,getFile };
}
