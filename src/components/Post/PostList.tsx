import Link from 'next/link';
import { Post } from '@prisma/client';
import Image from 'next/image';

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-24">
        <h3 className="text-lg font-medium text-gray-900">No posts found</h3>
        <p className="mt-1 text-gray-500">Check back later for new content.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full grid grid-cols-1 gap-12">
      {posts.map((post) => (
        <article
          key={post.id}
          className="w-full group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
        >
          <Link href={`/${post.slug}`} className="block sm:grid sm:gap-2 sm:grid-cols-3">
            <div className="col-span-1 relative w-full h-48 sm:h-full overflow-hidden">
              <Image
                src={post.imageLink || '/placeholder.jpg'}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="col-span-2 flex flex-col gap-4 p-6">
              <h2 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-brand-600 transition-colors">
                {post.title}
              </h2>
              <div className="flex items-center gap-2 border-b border-gray-300 px pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{post.postedBy}</span>
                </div>
                <time
                  dateTime={post.createdAt.toString()}
                  className="text-xs text-gray-500 font-medium"
                >
                  {new Date(Number(post.createdAt)).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
              <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed flex-1">
                {post.description.slice(0, 200) + '...'}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}