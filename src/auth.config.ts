import type { NextAuthConfig } from "next-auth";
import { GetUserByEMAIL } from "./lib/get";
import { z } from "zod"

import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs"

const schema = z.object({
    email: z.string(),
    password: z.string()
})

export default {providers: [
    Credentials({
        async authorize(credentials){
            const validated = schema.safeParse(credentials);
            if(validated.success){
                const { email, password } = validated.data;
                const user = await GetUserByEMAIL(email);
                if(!user || !user.password || !user.email) return null;
                const matched = await bcryptjs.compare(
                    password, user.password
                );
                if(matched) return user;
            }
            return null;
        },
    }),
]} satisfies NextAuthConfig;