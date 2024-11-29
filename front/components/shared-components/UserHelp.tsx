'use client'

import { useState } from "react";
import DrawerDialog from "./Card/DrawerDialog";
import { buttonVariants } from "../ui/button";
import { CircleHelp } from "lucide-react";
import { useTranslations } from "next-intl";

interface UserHelpProps {
    isOpen: boolean
}

export default function UserHelp({ isOpen = false }: UserHelpProps) {
    const [open, setOpen] = useState<boolean>(false);
    const tHelp = useTranslations('help');
    return (
        <DrawerDialog
            open={open}
            setOpen={setOpen}
            triggerChildren={      
                <div className={`${buttonVariants({ variant: 'ghost', size: (isOpen ? 'default' : 'icon') })} w-full flex justify-center items-center space-x-2 h-10`}>
                    <CircleHelp size={18} />
                    {isOpen && (
                        <h1 className="text-sm">{tHelp('help')}</h1>
                    )}
                </div>
            }
            headerTitleChildren={
                <div className="w-full h-10 flex items-center space-x-2">
                    <CircleHelp size={18} />
                    <h1 className="text-xl font-bold">{tHelp('help')}</h1>
                </div>
            }
            footerChildren={
                <>
                    <p className="whitespace-pre-line">{tHelp('help_description')}</p>
                    <p className="whitespace-pre-line font-bold">{tHelp('first_section.title')}</p>
                    <p className="whitespace-pre-line">{tHelp('first_section.description')}</p>
                    <p className="whitespace-pre-line font-bold">{tHelp('second_section.title')}</p>
                    <p className="whitespace-pre-line">{tHelp('second_section.description')}</p>
                    <p className="whitespace-pre-line font-bold">{tHelp('third_section.title')}</p>
                    <p className="whitespace-pre-line">{tHelp('third_section.description')}</p>
                    <p className="whitespace-pre-line font-bold">{tHelp('fourth_section.title')}</p>
                    <p className="whitespace-pre-line">{tHelp('fourth_section.description')}</p>
                </>
            }
        />
    )
}