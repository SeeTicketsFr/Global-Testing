import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu } from "./Menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DialogTitle } from "@/components/ui/dialog";
import Image from 'next/image';
import Logo from '@/public/logo.svg';

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-72 px-3 h-full flex flex-col" side="left">
        <DialogTitle></DialogTitle>
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/" className="flex items-center gap-2">
                <Image
                  priority
                  src={Logo}
                  alt="Global Testing's logo"
                  width='35'
                  height='35'
                />
                <h1 className="font-bold text-lg">Global Testing</h1>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}