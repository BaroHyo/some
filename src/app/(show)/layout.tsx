import React from 'react'
import type { PropNode } from '@/interfaces';
import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';
import { Sidebar } from '@/components';

export default async function LayoutShow({ children }: PropNode) {

    const session = await auth();

    if (!session?.user) {
        redirect(paths.auth.login);
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-50">
            <Sidebar  user={{
                name: session?.user.name ?? '',
                email: session?.user.email ?? '',
            }}/>
            <div className="p-4 xl:ml-80">
                {children}
            </div>
        </div>
    )
}
