import { columns } from "@/components/super-admin/role-table/column"
import { DataTable } from "@/components/super-admin/role-table/data-table"

import prisma from "@/lib/db"

async function GetAdmins(){
    return await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
}

export default async function RolesPage(){
    const admins = await GetAdmins()
    return(
        <div>
            <DataTable columns={columns} data={admins}/>
        </div>
    )
}