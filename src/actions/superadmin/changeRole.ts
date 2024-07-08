"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

const schema = z.object({
    roleId: z.string(),
    id: z.string()
})

export async function CHANGEROLE(
    state: { message: any },
    formData: FormData
){
    const validated = schema.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: null }
    }
    await prisma.user.update({
        where: { id: validated.data.id },
        data: { roleId: validated.data.roleId }
    })
    revalidatePath("/roles-superadmin")
    return { message: "Changed successfully" }
}