"use server"
import { db } from "@/lib/db";
import * as z from "zod"
import { RegisterSchema } from "@/lib/validation";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcrypt"



export const Register = async (values: z.infer<typeof RegisterSchema>) => {

    const validateFields = RegisterSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "All field are required" }
    }

    const { name, email, password } = validateFields.data

    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return {error : "Email address already in use"}
    }

    const hashedPassword = await bcrypt.hash(password , 10)

    const newUser = await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })
    return{success : "User registed successfullly"}

}      