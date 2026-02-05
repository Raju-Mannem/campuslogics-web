import { apolloClient } from '@/lib/apollo-client';
import { Post } from '@prisma/client';
import { notFound } from 'next/navigation';
import PostForm from '@/components/Admin/PostForm';
import { GET_POST_BY_SLUG } from '@/lib/graphql/queries';
import { SessionProvider } from "next-auth/react";

interface GetPostData {
    post: Post | null;
}

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function EditPostPage({ params }: Props) {
    const { slug } = await params;

    if (!slug) {
        notFound();
    }

    try {
        const { data } = await apolloClient.query<GetPostData>({
            query: GET_POST_BY_SLUG,
            variables: { slug: slug },
            fetchPolicy: 'no-cache',
        });

        const post = data?.post;

        if (!post) {
            notFound();
        }

        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Edit Post</h1>
                <SessionProvider><PostForm post={post} /></SessionProvider>
            </div>
        );
    } catch (error) {
        console.error('Error fetching post:', error);
        return (
            <div className="container mx-auto px-4 py-8 text-center text-red-600">
                Error loading post.
            </div>
        );
    }
}
