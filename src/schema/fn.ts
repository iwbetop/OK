import { z } from "zod"

export const Optional = <T extends z.ZodTypeAny>(schema: T) => {
    return z.union([schema, z.literal("")])
            .transform(value => value === "" ? null : value)
            .optional()
}

export const OptionalDate = <T extends z.ZodTypeAny>(schema: T) => {
    return z.union([schema, z.literal("")])
            .transform(value => value === "" ? null : new Date(value))
            .optional()
}