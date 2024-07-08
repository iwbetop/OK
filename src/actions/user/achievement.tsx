"use server";

import {z} from "zod";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const schema = z.object({
    userId: z.string(),
    name: z.string(),
    dateAchieved: z.string().date(),
    description: z.string(),
    category: z.string()
});

const schema1 = z.object({
    id: z.string(),
});

export async function AddAchievement(state: {message: string}, formData: FormData){
    const validated = schema.safeParse(Object.fromEntries(formData))
    console.log(validated.error)
    if(!validated.success){
        return { message: "Something went wrong" }
    }
    let { dateAchieved, category, ...other } = validated.data;
    let start: Date = new Date();
    if(dateAchieved.length > 0){
        start = new Date(dateAchieved)
    }
   
    if(dateAchieved.length < 0){
        return { message: "" }
    }
    let newCat = category as "SPECIAL" | "ACADEMIC" | "EXTRA_CURRICULUM"
    if(dateAchieved){
        await prisma.achievement.create({
            data: { dateAchieved: start, category: newCat, ...other }
        });
    }
    revalidatePath("/achievement")
    return { message: "success" }
}



export async function DeleteAchievement(state: {message: string}, formData: FormData){
    const validated = schema1.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: "Something went wrong" }
    }
   
        await prisma.achievement.delete({
            where: { id: validated.data.id }
        });

    revalidatePath("/achievement")
    redirect("/");
}