"use server"
import prisma from "@/lib/db"
import { GetUserByEMAIL } from "@/lib/get";
import { email, password } from "@/schema/schema";
import { z } from "zod";
import bcryptjs from "bcryptjs"
import { transporter } from "@/lib/email";
import {v4 } from "uuid"

const schema = z.object({
    email,
    password,
    confirmPassword: password
}).superRefine((value, ctx) => {
    if(value.password !== value.confirmPassword){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: ""
        })
    }
})

export async function SIGNUP(
    state: { message: any },
    formData: FormData
){
    const validated = schema.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: "Something went wrong" }
    }
    const exist = await GetUserByEMAIL(validated.data.email)
    if(exist){
        return { message: "Something went wrong" }
    }
    const hashed = await bcryptjs.hash(validated.data.password, 10)
    await prisma.user.create({
        data: {
            email: validated.data.email,
            password: hashed,
            roleId: "80dc52b9-2195-40ca-9841-fccfe5af3d03"
        }
    })
    // Send email
     // Create email verification token
     const token = v4();
     const expires = new Date(new Date().getTime() + 3600 * 1000);
 
     const emailToken = await prisma.emailToken.create({
         data: {
             email: validated.data.email,
             password: validated.data.password,
             token,
             expires
         }
     });
 
     // Send verification email to user
     await transporter.sendMail({
         from: process.env.USER,
         to: validated.data.email,
         subject: "Email Verification",
         text: "Please verify your email address to activate your account.",
         html: `
         <div style="background-color: #f0f4f8; padding: 20px;">
             <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 5px; padding: 20px;">
                 <p class="text-lg font-semibold text-gray-800 mb-4">Hello,</p>
                 <p class="text-base text-gray-700 mb-4">Please click <a class="text-blue-500 hover:text-blue-700" href="http://localhost:3000/email-verification?token=${emailToken.token}">here</a> to verify your email address and activate your account.</p>
                 <p class="text-base text-gray-700 mb-4">If you did not request this verification, please ignore this email.</p>
                 <p class="text-base text-gray-700">Thank you!</p>
             </div>
         </div>
         `
     });
 
    return { message: "Email sent" }
}