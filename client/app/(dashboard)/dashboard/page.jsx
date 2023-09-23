"use client"

import dynamic from "next/dynamic";

const Dashboard = () => {
    return (
        <div>
            Dashboard
        </div>
    )
}

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });