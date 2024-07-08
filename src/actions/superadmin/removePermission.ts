"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const schema = z.object({
    id: z.string()
})

export async function REMOVEPERMISSION(
    state: { message: any },
    formData: FormData
){
    const validated = schema.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: null }
    }
    await prisma.rolePermission.delete({
        where: { id: validated.data.id }
    })
    revalidatePath("/permissions-super-admin")
    return { message: null }
}