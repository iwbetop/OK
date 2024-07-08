import { z } from "zod"
import {
    email, password, name, description, biography, phone, title,
    PRIVACY, ACCOUNTSTATUS, GENDER, ROLES, EDUCATIONSTATUS,
    REPORTSTATUS, SOCIALPLATFORM
} from "@/schema/schema"
import { Optional } from "@/schema/fn"

export const CREATE_USER_SCHEMA = z.object({
    email, password
})

export const USER_SIGNIN = z.object({
    email, password, token: Optional(z.string().min(1).max(8))
})
