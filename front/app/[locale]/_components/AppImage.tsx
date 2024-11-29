'use client'

import ShineBorder from "@/components/magicui/shine-border";
import { Locale } from "@/lib/locales";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import Image from 'next/image'
import { useEffect, useState } from "react";

export function AppImage() {
    const { theme } = useTheme();
    const locale = useLocale() as Locale;

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const effectiveTheme = theme === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : theme;

    return (
        <div
        className="flex justify-center relative overflow-hidden"
        >
            {isClient && (
                <ShineBorder
                    className="flex h-full md:w-[65vw] w-full flex-col items-center justify-center rounded-lg bg-background"
                    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                >
                    <div className={`absolute inset-0 bg-gradient-to-t ${effectiveTheme === "light" ? "from-white" : ""} from-25% to-50%`} />
                    <Image
                        src={`/images/${effectiveTheme}-${locale}.png`}
                        width={200}
                        height={160}
                        quality={100}
                        priority
                        sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                        style={{ height: '100%', width: '100%' }}
                        alt="Picture of the Global Testing's application"
                    />
                </ShineBorder>
            )}
        </div>
    );
}
