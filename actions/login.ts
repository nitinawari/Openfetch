"use server"
import z from "zod";
import { LoginSchema } from "@/lib/validation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";



export const Login= async (values:z.infer<typeof LoginSchema>)=>{

    const validatedFields = LoginSchema.safeParse(values)

    if(validatedFields.error){
        return {error:"Invalid credentials"}
    }

    const {email , password} = validatedFields.data

    try {
        await signIn('credentials' , {
            email,
            password,
            redirectTo: '/dashboard'
        }
        )
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type){
                case "CredentialsSignin":
                    return{error : "Invalid credentials!"}
                default:
                    return{error: "something went wrong!"}
            }
        }
        throw error;
    }

}   