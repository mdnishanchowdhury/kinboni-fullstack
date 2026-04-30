import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProviders from "@/providers/QueryProvider";
import { ThemeProvider } from "@/components/Dark-Mode/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kinboni",
  description: "Kinboni",
  icons: {
    icon: [
      { url: '/image/logo/logoB.png' },
      { url: '/image/logo/logoB.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/iconA.png',
    apple: '/iconA.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProviders>
            {children}
          </QueryProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
