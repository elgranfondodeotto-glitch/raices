import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raíces — Construye tu patrimonio en Santander",
  description:
    "El primer ecosistema digital para que colombianos en el exterior inviertan en finca raíz en Santander, Colombia, con acompañamiento de principio a fin.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
