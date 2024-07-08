"use server";

// Import necessary functions and libraries
import { GetUserByEMAIL } from "@/lib/get";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import fs from "node:fs";
import { unstable_update } from "@/auth";

// Import zod for schema validation
import { z } from "zod"
import { name, email, requiredDate, biography } from "@/schema/schema";

const onboard = z.object({
    id: z.string(),
    firstName: name,
    lastName: name,
    middleName: name,
    province: z.string().min(2),
    city: z.string().min(2),
    street: z.string().min(2),
    personalEmail: email,
    phoneNumber: z.string().min(1).max(12),
    birthday: requiredDate,
    image: z.instanceof(File),
    biography: biography,
    courseId: z.string(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"])
});

// Backend function for user signup
export async function ONBOARD(
    state: { message: string }, // State object containing message
    formData: FormData // Form data object
) {
    const validated = onboard.safeParse(Object.fromEntries(formData)); // Validate form data against zod schema
    console.log(validated.error)
    if (!validated.success) { // If validation fails, return error message
        console.log(validated.error.flatten())
        return { message: "Something went wrong" };
    }

    let { image, id, birthday, ...other  } = validated.data;
    console.log(birthday)
    if(!birthday){
        return { message: "Birhdate is invalid" }
    }
    
    const extension = image.name.split(".").pop();
    if(extension === "undefined"){
        return { message: "Image is invalid!" };
    }

    const fileName = `${id}.${extension}`;
    const stream = fs.createWriteStream(`public/avatar/${fileName}`);
    const bufferedImage = await image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (err) => {
        if(err){
            return { message: "Something went wrong!" };
        }
    });
    const imageLink = `/avatar/${fileName}`;

    // Create user in the database
    await prisma.user.update({
        where: { id: validated.data.id },
        data: { image: imageLink, birthday, onbordedStatus: true, ...other }
    });


   await unstable_update({user: {onbordedStatus: true, ...other}})
    redirect("/")
    // Return success message after sending verification email
    return { 
        message: "Onboarding success" 
    };
}
