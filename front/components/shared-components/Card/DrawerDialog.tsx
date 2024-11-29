'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useBetterMediaQuery from "@/app/_hooks/useBetterMediaQuery";

const DrawerDialog = (props: any) => {
  const {
    open,
    setOpen,
    triggerChildren,
    headerTitleChildren,
    footerChildren,
  } = props;
  const isDesktop = useBetterMediaQuery("(min-width: 768px)");

  return (
    <section>
      {!isDesktop ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger>{triggerChildren}</DrawerTrigger>
          <DrawerContent>
            <DrawerTitle></DrawerTitle>
            <DrawerHeader>
              <DrawerDescription></DrawerDescription>
              {headerTitleChildren}
            </DrawerHeader>
            <DrawerFooter>{footerChildren}</DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>{triggerChildren}</DialogTrigger>
          <DialogContent className="max-w-full w-fit max-h-full h-fit">
            <DialogTitle></DialogTitle>
            <DialogHeader>
              <DialogDescription></DialogDescription>
              {headerTitleChildren}
            </DialogHeader>
            {footerChildren}
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default DrawerDialog;