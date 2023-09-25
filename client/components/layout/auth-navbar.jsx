"use client"

import { useAuth, UserButton } from "@clerk/nextjs"
import dynamic from "next/dynamic";

const AuthNavbar = () => {
    const { userId } = useAuth();
    return (
        <nav className="w-full bg-blue-600">
            <div className="w-[90%] mx-auto py-4 flex items-center justify-between">
                <div className="text-white flex items-center">
                    <img src="/images/logo.png" alt="logo" loading="lazy" className="w-[30px] h-[30px]" />
                   <span className="ml-1">marcos</span>
                </div>

                <UserButton afterSignOutUrl="/" />
            </div>
        </nav>
    )
}

export default dynamic(() => Promise.resolve(AuthNavbar), { ssr: false });