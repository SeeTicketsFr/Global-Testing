"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Particles from "@/components/magicui/particles";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedGradientTextBadge } from "@/app/[locale]/_components/AnimatedGradientTextBadge";
import { useTranslations } from "next-intl";

export const Header = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const tHome = useTranslations('home.header');

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <div className="relative flex h-[45em] w-full flex-col items-center justify-center overflow-hidden bg-background">
      <section className="w-full flex flex-col items-center justify-center gap-8 md:p-16 p-8">
        <AnimatedGradientTextBadge />
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center md:text-8xl text-6xl font-bold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          {tHome('title')}
        </span>
        <span className="px-16 pointer-events-none whitespace-pre-wrap bg-clip-text text-center text-xl leading-none">
        {tHome('description')}
        </span>
      </section>
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color={color}
          refresh
        />
    </div>
  );
};