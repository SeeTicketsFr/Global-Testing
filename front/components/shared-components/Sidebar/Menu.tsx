"use client";

import Link from "next/link";
import { Ellipsis, Home, Info, LayoutGrid } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "./CollapseMenuButton";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import _ from "lodash";
import UserHelp from "@/components/shared-components/UserHelp";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/lib/locales";
import { Separator } from "@/components/ui/separator";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen = false }: MenuProps) {
    const pathname = usePathname();
    const tScenario = useTranslations('scenario');
    const tHome = useTranslations('home');
    const locale = useLocale() as Locale;
    const menuList = [
        {
            groupLabel: tHome('sidebar.navigation'),
            menus: [
                {
                    href: `/${locale}`,
                    label: tHome('title'),
                    active: pathname === `/${locale}`,
                    icon: Home,
                    submenus: []
                },
                {
                    href: `/${locale}/scenarios`,
                    label: tScenario('name'),
                    active: pathname === `/${locale}/scenarios`,
                    icon: LayoutGrid,
                    submenus: []
                }
            ]
        },
    ]

    return (
        <nav className="mt-8 h-full w-[full]">
            <ul className="flex flex-col  items-start space-y-1 px-2">
            {menuList.map(({ groupLabel, menus }, index) => (
                <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
                {(isOpen && groupLabel) || isOpen === undefined ? (
                    <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                    {groupLabel}
                    </p>
                ) : !isOpen && isOpen !== undefined && groupLabel ? (
                    <TooltipProvider>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger className="w-full">
                        <div className="w-full flex justify-center items-center">
                            <Ellipsis className="h-5 w-5" />
                        </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                        <p>{groupLabel}</p>
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
                ) : (
                    <p className="pb-2"></p>
                )}
                {menus.map(
                    ({ href, label, icon: Icon, active, submenus }, index) =>
                    submenus.length === 0 ? (
                        <div className="w-full" key={index}>
                        <TooltipProvider disableHoverableContent>
                            <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <Button
                                variant={active ? "secondary" : "ghost"}
                                className="w-full justify-start h-10 mb-1"
                                asChild
                                >
                                <Link href={href}>
                                    <span
                                    className={cn(isOpen === false ? "" : "mr-4")}
                                    >
                                    <Icon size={18} />
                                    </span>
                                    <p
                                    className={cn(
                                        "max-w-[200px] truncate",
                                        isOpen === false
                                        ? "-translate-x-96 opacity-0"
                                        : "translate-x-0 opacity-100"
                                    )}
                                    >
                                    {label}
                                    </p>
                                </Link>
                                </Button>
                            </TooltipTrigger>
                            {isOpen === false && (
                                <TooltipContent side="right">
                                {label}
                                </TooltipContent>
                            )}
                            </Tooltip>
                        </TooltipProvider>
                        </div>
                    ) : (
                        <div className="w-full" key={index}>
                        <CollapseMenuButton
                            icon={Icon}
                            label={label}
                            active={active}
                            submenus={submenus}
                            isOpen={isOpen}
                        />
                        </div>
                    )
                )}
                </li>
            ))}
            <Separator />
            <li className="w-full">
                <UserHelp isOpen={isOpen} />
            </li>
            </ul>
        </nav>
    );
}