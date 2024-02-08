import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Fleet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("relative h-full font-sans antialiased", `${inter.variable} font-sans`, `${manrope.variable} font-sans`)}>
        <main className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
