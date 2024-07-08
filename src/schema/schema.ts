import { z } from "zod"
import { parsePhoneNumber } from "libphonenumber-js"

export const requiredDate = z.coerce
                      .date().min(new Date("1980-01-01")).max(new Date())

export const name = z.string()
                    .trim()
                    .min(1, "Name cannot be empty")
                    .max(255, "Name is too long")
                    .refine((name) => /^[a-zA-Z\-'\s]+$/.test(name), {
                        message: "Name can only contain letters, hyphens, apostrophes, and spaces"
                    })

export const email = z.string()
                     .email("Please enter a valid email address")

export const password = z.string()
                     .min(8, "Password must be at least 8 characters long")
                     .max(255, "Password is too long")
                     .refine((password) => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+/.test(password), {
                       message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                     })
export const description = z.string()
                           .trim() 
                           .max(150, "Description is too long")
export const biography = z.string()
                           .trim() 
                           .max(250, "Description is too long")

export const phone = z.string()
               .superRefine((value, ctx) => {
                    const phoneIsValid = parsePhoneNumber(value, "PH")
                    if(!phoneIsValid){
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: "Phone number is invalid"
                        })
                    }
               })
export const title = z.string()
               .trim()
               .min(1, "Title cannot be empty")
               .max(255, "Title is too long");


export const PRIVACY = z.enum(["PUBLIC", "PRIVATE"])
export const ACCOUNTSTATUS = z.enum(["ACTIVE", "SUSPENDED", "LOCKED", "ARCHIEVED"])
export const ROLES = z.enum(["ADMIN", "SUPERADMIN", "USER"])
export const EDUCATIONSTATUS = z.enum(["ENROLLED", "GRADUATED", "LEFT"])
export const REPORTSTATUS = z.enum(["PENDING", "RESOLVED", "CLOSED"])
export const SOCIALPLATFORM = z.enum(["FACEBOOK", "LINKEDIN", "INSTAGRAM", "X", "GITHUB", "BEHANCE", "DRIBBLE", "YOUTUBE" , "TIKTOK", "OTHER"])
export const GENDER = z.enum(["MALE", "FEMALE", "OTHER"])