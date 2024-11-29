import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../globals.css';
import { ThemeProvider } from "@/components/theme-provider";
import DefaultLayout from "@/components/shared-components/layouts/DefaultLayout";
import {NextIntlClientProvider, useMessages} from 'next-intl';
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "jotai";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global Testing",
  description: "Global Testing UI",
};

export default function LocaleLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {

  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider locale={locale} messages={messages}>
              <DefaultLayout>
                <Provider>
                  {children}
                </Provider>
              </DefaultLayout>
              <Toaster />
            </NextIntlClientProvider>

          </ThemeProvider>
      </body>
    </html>
  );
}
