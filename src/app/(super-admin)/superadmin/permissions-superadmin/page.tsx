import prisma from "@/lib/db"

import { DataTable } from "@/components/super-admin/permission-table/data-table"
import { columns } from "@/components/super-admin/permission-table/columns"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Plus } from "lucide-react"

import { Form, Submit } from "@/components/form/form"
import { ADDPERMISSION } from "@/actions/superadmin/addPermission"

import { SelectPermission } from "@/components/super-admin/permission-table/select-permission"

async function GetRolePermissions(roleId: string){
    return await prisma.rolePermission.findMany({
        where: { roleId: roleId },
        select: {
            id: true,
            permission: {
                select: { id: true, name: true, description: true }
            },
            role: {
                select: { id: true, name: true }
            },
        },
    })
}

async function GetPermissions(){
    return await prisma.permission.findMany()
}

export default async function RolesPage({ 
    searchParams
 }: { 
    searchParams : {
        q: string
    }
 }){
    const rolePermissions = await GetRolePermissions(searchParams.q)
    const permissions = await GetPermissions()
    return(
        <div>
           {searchParams.q && (
              <Sheet>
                    <SheetTrigger>
                        <Plus className="w-7 h-7 bg-primary text-primary-foreground rounded p-1 absolute top-4 right-4"/>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                        <SheetTitle>Manage Role Permissions</SheetTitle>
                        <SheetDescription>
                            Add role permission to the {rolePermissions.length > 0 ? rolePermissions[0].role.name : "ADMIN"}?
                        </SheetDescription>
                        </SheetHeader>
                        {/* form todo add permission */}
                        <Form form={ADDPERMISSION}>
                            <input type="hidden" name="roleId" value={rolePermissions.length > 0 ? rolePermissions[0].role.id : "64697b01-e0e3-4e95-a3fa-36bb0d0fbb03"} />
                            <SelectPermission permissions={permissions} />
                            <Submit label="Add"/>
                        </Form>
                    </SheetContent>
                </Sheet>
           )}
            {searchParams.q && (
                <DataTable data={rolePermissions} columns={columns} />
            )}
            {!searchParams.q && (
                <div className="w-full pt-36 flex items-center justify-center">
                    <p className="text-muted-foreground">Select a role...</p>
                </div>
            )}
        </div>
    )
}