import { z } from "zod";

export const jwtPayload =  z.object({
    userId : z.string()
})

export type JWTPayload = z.infer<typeof jwtPayload>