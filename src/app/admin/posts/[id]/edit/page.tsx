import { gql } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';
import { Post } from '@prisma/client';
import { notFound } from 'next/navigation';
import PostForm from '@/components/Admin/PostForm';

const GET_POST_BY_ID = gql`
  query GetPostById($id: Int!) {
    post(id: $id) {
      id
      title
      slug
      imageLink
      description
      content
      tags
      links
      postedBy
      published
      createdAt
      updatedAt
    }
  }
`;

interface GetPostData {
    post: Post | null;
}

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: Props) {
    const { id } = await params;
    const postId = parseInt(id, 10);

    if (isNaN(postId)) {
        notFound();
    }

    try {
        const { data } = await apolloClient.query<GetPostData>({
            query: GET_POST_BY_ID,
            variables: { id: postId },
            fetchPolicy: 'no-cache',
        });

        const post = data?.post;

        if (!post) {
            notFound();
        }

        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Edit Post</h1>
                <PostForm post={post} />
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
