"use client"
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client/react';
import { Post, Image as PrismaImage } from '@prisma/client';
import ImageUpload from '../Image/ImageUpload';
import { useLoader } from '@/context/LoaderContext';
import { useRouter } from 'next/navigation';
import Tiptap from '../Editor';
import Image from 'next/image';
import { Prisma } from '@prisma/client';
import { CREATE_POST, UPDATE_POST } from '@/lib/graphql/mutations';

interface CreatePostResponse {
  createPost: Post;
}

interface UpdatePostResponse {
  updatePost: Post;
}

interface PostFormData {
  postType: string;
  title: string;
  description: string;
  content: Prisma.InputJsonValue;
  tags: string;
  links: string;
  postedBy: string;
  imageLink: string;
  published: boolean;
}

interface PostFormProps {
  post?: Post
  onSuccess?: (post: Post) => void
}

export default function PostForm({ post, onSuccess }: PostFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<PostFormData>({
    postType: post?.postType || 'job',
    title: post?.title || '',
    description: post?.description || '',
    content: post?.content || '',
    tags: post?.tags.join(', ') || '',
    links: post?.links ? JSON.stringify(post.links, null, 2) : '{}',
    postedBy: post?.postedBy || '',
    imageLink: post?.imageLink || '',
    published: post?.published || false
  })

  const [selectedImage, setSelectedImage] = useState<PrismaImage | null>(null)
  const [createPost] = useMutation<CreatePostResponse>(CREATE_POST)
  const [updatePost] = useMutation<UpdatePostResponse>(UPDATE_POST)
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    if (post) {
      setFormData({
        postType: post.postType || '',
        title: post.title || '',
        description: post.description || '',
        content: post.content || '',
        tags: post.tags.join(', ') || '',
        links: post.links ? JSON.stringify(post.links, null, 2) : '{}',
        postedBy: post.postedBy || '',
        imageLink: post.imageLink || '',
        published: post.published || false
      })
    }
  }, [post]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedImage && !post?.imageLink && !formData.imageLink) {
      alert('Please select an image')
      return
    }

    let parsedLinks = {}
    try {
      parsedLinks = JSON.parse(formData.links)
    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (e: any) {
      alert('Invalid JSON in Links field'+e)
      return
    }

    const input = {
      ...formData,
      imageLink: selectedImage?.url || formData.imageLink,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      links: parsedLinks,
    }

    showLoader();

    try {
      let result: Post;
      if (post) {
        const { data } = await updatePost({
          variables: {
            id: post.id,
            input: {
              ...input,
              published: formData.published
            }
          }
        })
        if (!data) {
          alert("No data returned from update");
          throw new Error("No data returned from update");
        }
        result = data.updatePost;
      } else {
        const { data } = await createPost({
          variables: { input }
        })
        if (!data){
          alert("No data returned from update");
          throw new Error("No data returned from create");
        } 
        result = data.createPost;
      }

      if (onSuccess) {
        onSuccess(result);
      } else {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Failed to save post')
    } finally {
      hideLoader();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700">Post Type</label>
          <input
            type="text"
            value={formData.postType}
            onChange={(e) => setFormData(prev => ({ ...prev, postType: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700">Content (HTML)</label>
          <Tiptap 
            onChange={(json) => setFormData(prev => ({ ...prev, content: json as Prisma.InputJsonValue }))}
            content={formData.content}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value.toLocaleLowerCase() }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Posted By</label>
          <input
            type="text"
            value={formData.postedBy}
            onChange={(e) => setFormData(prev => ({ ...prev, postedBy: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700">Links (JSON)</label>
          <textarea
            value={formData.links}
            onChange={(e) => setFormData(prev => ({ ...prev, links: e.target.value }))}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">Enter valid JSON object</p>
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
          {formData.imageLink && !selectedImage && (
            <Image
              src={formData.imageLink}
              alt="Current"
              width={100}
              height={100}
              className="h-48 w-96 object-contain rounded-md mb-4 border border-gray-200"
            />
          )}

          <ImageUpload
            onImageSelect={setSelectedImage}
            selectedImage={selectedImage || undefined}
          />
          {selectedImage && (
            <div className="mt-2 text-sm text-green-600 font-medium">
              New image selected: {selectedImage.name}
            </div>
          )}
        </div>

        <div className="flex items-center col-span-full">
          <input
            type="checkbox"
            id="published_check"
            checked={formData.published}
            onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
          />
          <label htmlFor="published_check" className="ml-2 text-sm text-gray-700 font-medium cursor-pointer">Published</label>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium transition-colors"
        >
          {post ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  )
}