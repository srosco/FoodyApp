"use client"

import "./globals.css";
import { Geist_Mono, Montserrat } from "next/font/google";
import LayoutClient from "./layout.client";
import { NotificationProvider } from "./context/NotificationContext";
import React from "react";

const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

const montserratMono = Geist_Mono({
  variable: "--font-montserrat-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
      </head>
      <NotificationProvider>
        <body
          className={`${montserratSans.variable} ${montserratMono.variable} antialiased bg-gradient-to-bl from-orange-300 to-rose-600`}
        >
          <LayoutClient>{children}</LayoutClient>
        </body>
      </NotificationProvider>
    </html>
  );
}