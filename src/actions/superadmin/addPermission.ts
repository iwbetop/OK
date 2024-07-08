"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const schema = z.object({
    roleId: z.string(),
    permissionId: z.string()
})

export async function ADDPERMISSION(
    state: { message: any },
    formData: FormData
){
    const validated = schema.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: null }
    }
    const existing = await prisma.rolePermission.findFirst({
        where: { 
            AND: [
                { roleId: validated.data.roleId },
                { permissionId: validated.data.permissionId }
            ]
         }
    })
    if(existing){
        return { message: "already exist" }
    }
    await prisma.rolePermission.create({
        data: {
            permissionId: validated.data.permissionId,
            roleId: validated.data.roleId
        }
    })
    revalidatePath("/permissions-super-admin")
    return { message: "Added successfully" }
}