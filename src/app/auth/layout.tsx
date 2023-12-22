import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="bg-white">
            <div className="flex min-h-screen">
                <div className="flex flex-row w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}
