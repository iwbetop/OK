import { Separator } from "@/components/ui/separator"

import { User } from "lucide-react"

import { SelectRole } from "@/components/super-admin/user-role/select-role"

import prisma from "@/lib/db"

export async function GetRoles(){
    return await prisma.role.findMany({
        where: {
            NOT: { name: "USER" }
        }
    })
}

export default async function RolesPermissionsLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>){
    const roles = await GetRoles()
    return(
        <div>
            <div>
                <div className="flex gap-2 items-center">
                    <User className="w-5 h-5"/>
                    <h3 className="text-xl">Manage Role Permissions</h3>
                </div>
                <Separator className="my-3" />
            </div>
            <div className="relative">
                <div className="flex gap-3">
                    <SelectRole role={roles} />
                </div>
                {children}
            </div>
        </div>
    )
}