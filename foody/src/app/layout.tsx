"use client"

import "./globals.css";
import { Geist_Mono, Montserrat } from "next/font/google";
import Head from 'next/head';
import ClientLayout from './layout.client';  // Client-side layout with redirection
import LayoutClient from "./layout.client";

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
        {/* You can add additional head content here */}
        {/* Example: Global Meta Tags */}
      </head>
      <body
        className={`${montserratSans.variable} ${montserratMono.variable} antialiased bg-gradient-to-bl from-orange-300 to-rose-600`}
      >
        {/* This is where we wrap the `children` with client-side layout */}
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}