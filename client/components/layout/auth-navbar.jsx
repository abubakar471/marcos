"use client"

import { useAuth, UserButton } from "@clerk/nextjs"

const AuthNavbar = () => {
    const { userId } = useAuth();
    return (
        <nav className="w-full bg-blue-600">
            <div className="w-[90%] mx-auto py-4 shadow flex items-center justify-between">
                <div className="text-white">marcos</div>

                <UserButton afterSignOutUrl="/sign-in" />
            </div>
        </nav>
    )
}

export default AuthNavbar