"use client"

import "./globals.css";
import { Montserrat } from "next/font/google";
import LayoutClient from "./layout.client";
import { NotificationProvider } from "./context/NotificationContext";
import React from "react";

const montserrat_sans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
      </head>
      <NotificationProvider>
        <body
          className={`${montserrat_sans.variable} antialiased bg-gradient-to-bl from-orange-300 to-rose-600`}
        >
          <LayoutClient>{children}</LayoutClient>
        </body>
      </NotificationProvider>
    </html>
  );
}