"use client"

import "./globals.css";
import LayoutClient from "./layout.client";
import { NotificationProvider } from "./context/NotificationContext";
import React from "react";
export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
      </head>
      
      <NotificationProvider>
        <body
          className={`antialiased bg-gradient-to-bl from-orange-300 to-rose-600`}
          >
          <LayoutClient>{children}</LayoutClient>
        </body>
      </NotificationProvider>
    </html>
  );
}