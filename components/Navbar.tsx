"use client"
import { Profile } from "@/components/profile"
import { useState } from "react";

export const Navbar = () => {
    return (
        <header className="bg-[#FDFDFD]  border-b border-gray-300 z-50 ">
            <nav className="max-w-7xl m-auto">
                <div className="flex h-16">
                    {/* logo */}
                    <div className="flex items-center ">
                        <img src="logo.png" alt="" className="w-60" />

                        {/* menu */}
                        <div className="flex items-center gap-2 ml-3">
                            <a href="" className="font-bold text-[#676E7E] p-2 hover:text-black">Home</a>
                            <a href="" className="font-bold text-[#676E7E] p-2 hover:text-black">Product</a>
                            <a href="" className="font-bold text-[#676E7E] p-2 hover:text-black">Dashboard</a>
                            <a href="" className="font-bold text-[#676E7E] p-2 hover:text-black">About us</a>
                        </div>
                    </div>

                    {/* profile */}
                    <div className="flex items-center ml-auto">
                        <Profile />
                    </div>
                </div>
            </nav>

        </header>
    )
}