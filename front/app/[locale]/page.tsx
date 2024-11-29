import { Navbar } from "@/components/shared-components/Navbar/Navbar";
import { Header } from "@/app/[locale]/_components/Header";
import { AppImage } from "@/app/[locale]/_components/AppImage";
import Description from "@/app/[locale]/_components/Description";
import { Grid } from "@/app/[locale]/_components/Grid";
import { Footer } from "@/components/shared-components/Footer/Footer";
import { getTranslations } from "next-intl/server";


export default async function Home() {
    const tHome = await getTranslations('home');

    return (
        <>
            <Navbar title={tHome('title')} />
            <div className="container pt-8 pb-8 px-4 sm:px-8">
                <Header />
                <div className="p-16 space-y-8">
                    <AppImage />
                    <Description />
                    <Grid />
                </div>
                <Footer />
            </div>
        </>
    );
}