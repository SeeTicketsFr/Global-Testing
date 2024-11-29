'use client'

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "./Menu";
import { SidebarToggle } from "./SidebarToggle";
import { useTranslations } from "next-intl";
import Image from 'next/image';
import Logo from '@/public/logo.svg';

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({isOpen = false, setIsOpen}: NavbarProps) {
    const tHome = useTranslations('home');

    return (
        <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
        <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <a
          control-id="logo-link"
          href="/"
          className={cn(
            "space-x-2 transition-transform ease-in-out duration-300 mb-1",
            isOpen === false ? "translate-x-1" : "translate-x-0",
            buttonVariants({ variant: "link" })
          )}
        >
          <Image
            priority
            src={Logo}
            alt="Global Testing's logo"
            width='35'
            height='35'
          />
          <h1
            className={cn(
              "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
              isOpen === false
                ? "-translate-x-96 opacity-0 hidden"
                : "translate-x-0 opacity-100"
            )}
          >
            {tHome('name')}
          </h1>
        </a>

        <Menu isOpen={isOpen} />
       </div>
    </aside>
    )
};