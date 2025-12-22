import * as z from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email({message:"Invalid email address"}),
    password:z.string().min(6, "Password must be 6 character long")
})

export const LoginSchema = z.object({
    email: z.email({message:"Invalid email address"}),
    password:z.string().min(1, {message: "password is required"})
})

export const CategorySchema = z.object({
  categoryName: z.string().trim().min(1).max(15),
});