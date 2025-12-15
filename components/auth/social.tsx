"use client"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from '@/components/ui/Button'
import { signIn } from "next-auth/react"

export const Social = () =>{

    const onClick = (provider: "google" | "github") =>{
        signIn(provider, 
            {
            callbackUrl:'/dashboard'
            }
        )
    }

    return(
        <div className="flex flex-row w-full space-x-2">
            <Button
            variant="outline"
            size="default"
            onClick={()=>onClick("google")}
            >
                <FcGoogle className="w-5 h-5"/>
            </Button>
            <Button
            variant="outline"
            size="default"
            onClick={()=>onClick("github")}
            >
               <FaGithub className="w-5 h-5 text-black"/>
            </Button>
        </div>
    )

}