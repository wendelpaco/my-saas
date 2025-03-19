"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  types: string; // Add the 'types' property
}

export default function RootLayout({ children, types }: LayoutProps) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
