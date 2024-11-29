import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ApiDocumentationsTable } from "./ApiDocumentationsTable";
import { getTranslations } from 'next-intl/server';
import AddApiDocumentation from "./AddApiDocumentation";

export default async function ApiDocumentations() {
    const tApiDocumentations = await getTranslations('api_documentations');

    return (
        <section className="p-8">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>{tApiDocumentations('manage')}</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 justify-center items-center">
                        <AddApiDocumentation apiDocumentation={null} setApiDocumentation={null} />
                        <ApiDocumentationsTable />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    )
}
