import { getScenarios } from "@/app/_store/Scenarios";
import Scenarios from "@/app/[locale]/scenarios/_components/Scenarios";
import {getTranslations} from 'next-intl/server';
import AddScenario from "@/app/[locale]/scenarios/_components/AddScenario";
import { Navbar } from "@/components/shared-components/Navbar/Navbar";
import ApiDocumentations from "./_components/ApiDocumentations";

export default async function ScenariosPage() {
    const scenarios = getScenarios();
    const [scenariosData] = await Promise.all([scenarios]);
    const t = await getTranslations('scenario');

    return (
        <section className="h-full w-full">
            <Navbar title={t('name')} />
            <ApiDocumentations />
            <div className="container pt-8 pb-8 px-4 sm:px-8 space-y-8">
                <div className="w-full flex justify-center">
                    <AddScenario />
                </div>
                {scenariosData !== undefined && (<Scenarios scenariosData={scenariosData} />)}
            </div>
        </section>
    );
}
