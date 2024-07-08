import "@/app/globals.css"
import { Metadata } from "next"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

import { Separator } from "@/components/ui/separator"

import { ProfSum } from "@/components/user/prof-summary"

export const metadata: Metadata = {
    title: "Super Admin"
}

export default async function Achievement({
    children
}: Readonly<{children: React.ReactNode}>){
    return(
        <div className="space-y-4">
            <ProfSum />
            <div className="pb-4 space-x-6">
                <Link
                href="/achievement" 
                className={buttonVariants({variant: "link", size: "dropdown"})}>
                 Academic Achievement
                </Link>
                <Link
                href="/achievement/special" 
                className={buttonVariants({variant: "link", size: "dropdown"})}>
                 Special Achievement
                </Link>
                <Link
                href="/achievement/extra" 
                className={buttonVariants({variant: "link", size: "dropdown"})}>
                 Extra Curriculum
                </Link>
            </div>
            {children}
        </div>
    )
}