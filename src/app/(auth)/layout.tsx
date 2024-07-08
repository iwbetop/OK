import "@/app/globals.css"
import { GeistSans } from "geist/font/sans"
import { Metadata } from "next"
import { ThemeProvider } from "@/components/theme"

export const metadata: Metadata = {
    title: "Super Admin"
}

export default function UserLayout({
    children
}: Readonly<{children: React.ReactNode}>){
    return(
        <html lang="en" suppressHydrationWarning>
            <body className={GeistSans.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                   <div className="max-w-5xl w-full mx-auto">
                        <div className="flex items-center justify-center min-h-screen">
                            <main>{children}</main>
                        </div>
                   </div>
                </ThemeProvider>
            </body>
        </html>
    )
}