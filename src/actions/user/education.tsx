"use server";

import {z} from "zod";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const schema = z.object({
    userId: z.string(),
    name: z.string(),
    dateStarted: z.string().date(),
    dateEnded: z.string().date(),
});

const schema1 = z.object({
    id: z.string(),
});

export async function AddEducation(state: {message: string}, formData: FormData){
    const validated = schema.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: "Something went wrong" }
    }
    let { dateStarted, dateEnded, ...other } = validated.data;
    console.log(validated.data)
    let start: Date = new Date();
    let end: Date = new Date();
    if(dateStarted.length > 0){
        start = new Date(dateStarted)
    }
    if(dateEnded.length > 0){
        end = new Date(dateEnded)
    }
    if(dateStarted.length < 0 || dateEnded.length < 0){
        return { message: "" }
    }
    if(dateStarted && dateEnded){
        await prisma.education.create({
            data: { dateStarted: start, dateEnded: end, ...other }
        });
    }
    revalidatePath("/education")
    return { message: "Added successfully" }
}



export async function DeleteEducation(state: {message: string}, formData: FormData){
    const validated = schema1.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: "Something went wrong" }
    }
   
        await prisma.education.delete({
            where: { id: validated.data.id }
        });

    revalidatePath("/education")
    return { message: "" }
}