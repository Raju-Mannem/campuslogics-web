'use client';
import { SessionProvider } from "next-auth/react";
import PostForm from '@/components/Admin/PostForm';

export default function NewPostPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Create New Post</h1>
             <SessionProvider><PostForm /></SessionProvider>
        </div>
    );
}
