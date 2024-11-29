"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DrawerTrigger } from "@/components/ui/drawer"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface DialogConfirmationProps {
    translationPath: string
    handleSubmit: any
    triggerChildren: any
    description: string
}

export function DialogConfirmation(props: DialogConfirmationProps) {
    const {
        translationPath,
        handleSubmit,
        triggerChildren,
        description,
      } = props;

    const [open, setOpen] = useState(false);
    const t = useTranslations(`${translationPath}.confirmation`);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DrawerTrigger>{triggerChildren}</DrawerTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogTitle></DialogTitle>
                <DialogHeader>
                    <DialogTitle>{t('confirmationTitle')}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                        {t('no')}
                    </Button>
                    <Button type="button" variant="destructive" onClick={() => {
                        handleSubmit();
                        setOpen(false);
                    }}>
                        {t('yes')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
