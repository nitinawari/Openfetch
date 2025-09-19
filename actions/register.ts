"use server"
import { db } from "@/lib/db";

interface RegisterProps{
    email:string;
    password:string;
}
export const Register = async (data:any)=>{
    const {name , email , password} = data

    const newUser = await db.user.create({
        data:{
            name:name,
            email:email,
            password:password
        }
    })
}      