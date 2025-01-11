import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Metadata } from 'next';
import { AuthProvider } from "../../contexts/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gestão de Agências de Turismo",
  description: "Sistema desenvolvido para um processo seletivo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>

          {children}

        </AuthProvider>
      </body>
    </html>
  );
}
