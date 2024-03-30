import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main className="flex relative min-h-screen w-full flex-col items-center justify-between">
            <NavBar />
            <div className="flex-grow min-h-0 w-full">{children}</div>
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
