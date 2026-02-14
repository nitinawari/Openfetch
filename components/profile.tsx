"use client"
import { CgProfile } from "react-icons/cg";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from 'next-auth/react';
export const Profile = () => {

    const router = useRouter()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className="relative">
            <CgProfile
                className="w-9 h-9 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen &&
                <div className="absolute top-9 z-50  border w-40 rounded-md ">

                    <Button variant="outline" className=" bg-gray-100 p-2 mt-2 "
                    onClick={()=>router.push("/")}
                    >
                        Home
                    </Button>

                    <Button 
                    variant="outline" 
                    className=" bg-gray-100 p-2 "
                    onClick={()=>router.push("/settings")}
                    >
                        Settings
                    </Button>
                    <Button
                    variant="outline"
                    className="bg-gray-100 p-2 "
                        onClick={() => {
                            signOut({ redirectTo: "/login" })
                        }
                    }
                    >
                       Signout
                    </Button>
                </div>
            }
        </div>
    )

}