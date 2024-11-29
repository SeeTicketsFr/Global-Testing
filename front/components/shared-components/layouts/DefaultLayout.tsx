"use client"

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from '../Sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}


export default function DefaultLayout({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main
          className={cn(
            "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
            isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
          )}
        >
          <div className="flex min-h-screen flex-col items-center justify-between bg-background">
            {children}
          </div>
        </main>
      </>
  );
}
