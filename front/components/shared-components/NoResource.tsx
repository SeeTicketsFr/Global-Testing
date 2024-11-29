import { Folder } from "lucide-react"
import { buttonVariants } from "../ui/button"
import { useTranslations } from "next-intl";

interface INoResource {
    text: string;
    noPadding?: boolean;
}

export default function NoResource({ text, noPadding }: INoResource) {
    const tInfos = useTranslations('infos');
    return (
        <section
            className={`flex flex-col justify-center items-center gap-2 ${
                noPadding ? "" : "pt-20"
            }`}
        >
            <div className={`${buttonVariants({ variant: 'outline', size: 'icon' })}`}>
                <Folder className="h-5 w-full text-muted-foreground" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">{tInfos('no_resource')}</h2>
            <p className="text-sm text-muted-foreground">{text}</p>
        </section>
    );
}
