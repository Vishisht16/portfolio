import type React from "react"
import ClientLayout from "./ClientLayout"

export const metadata = {
  title: "Vishisht Mishra - Portfolio",
  description: "Machine Learning Engineer Portfolio",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}



import './globals.css'