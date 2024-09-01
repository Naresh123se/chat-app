import AuthProvider from '@/app/context/AuthProvider';
import TopBar from '@/components/ui/TopBar';
import React from 'react';

export default function Chats({ children }: { children: React.ReactNode }) {
    return (
        <>
        <AuthProvider>
            <TopBar/>
            {children}
        </AuthProvider>

        </>
    );
}
