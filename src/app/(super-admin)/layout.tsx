import "@/app/globals.css"
import { GeistSans } from "geist/font/sans"
import { Metadata } from "next"
import { ThemeProvider } from "@/components/theme"

import { Header } from "@/components/super-admin/header"

export const metadata: Metadata = {
    title: "Super Admin"
}

export default function SuperAdminLayout({
    children
}: Readonly<{children: React.ReactNode}>){
    return(
        <html lang="en" suppressHydrationWarning>
            <body className={GeistSans.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                   <div className="max-w-5xl w-full mx-auto">
                        <div className="flex flex-col">
                            <header className="p-4 pt-10"><Header /></header>
                            <main>{children}</main>
                        </div>
                   </div>
                </ThemeProvider>
            </body>
        </html>
    )
}