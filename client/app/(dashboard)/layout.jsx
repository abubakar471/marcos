"use client"

import DashboardContent from "@/components/dashboard/dashboard-content";
import AuthNavbar from "@/components/layout/auth-navbar";
import Sidebar from "@/components/layout/sidebar";
import PageLoader from "@/components/layout/page-loader";
import { useState } from "react";

export default function RootLayout({ children }) {
    const [active, setActive] = useState(1);

    return (

            <div>
                <AuthNavbar />
                <div className="flex">
                    <div className="w-1/4">
                        <Sidebar active={active} setActive={setActive} />
                    </div>
                    <div className="w-3/4 overflow-hidden">
                        <DashboardContent active={active} />
                    </div>
                </div>
            </div>

    )
}
