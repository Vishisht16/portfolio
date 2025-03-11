"use client"
import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="futuristic-background"></div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

