import {z} from "zod";

export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "minimun password lenght is 8"),
    username: z.string()

})
export type CreateUserInput = z.infer<typeof createUserSchema>;

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})
export type LoginUserInput = z.infer<typeof loginUserSchema>;
