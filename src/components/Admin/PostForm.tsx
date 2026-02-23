"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Post, Image as PrismaImage, Prisma } from "@prisma/client";
import { useForm, Controller } from "react-hook-form";
import ImageUpload from "../Image/ImageUpload";
import { useLoader } from "@/context/LoaderContext";
import { useRouter } from "next/navigation";
import Tiptap from "../Editor";
import Image from "next/image";
import { CREATE_POST, UPDATE_POST } from "@/lib/graphql/mutations";
import { useSession } from "next-auth/react";

interface CreatePostResponse {
  createPost: Post;
}

interface UpdatePostResponse {
  updatePost: Post;
}

interface PostFormValues {
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
  post?: Post;
  onSuccess?: (post: Post) => void;
}

export default function PostForm({ post, onSuccess }: PostFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { showLoader, hideLoader } = useLoader();

  const [selectedImage, setSelectedImage] = useState<PrismaImage | null>(null);

  const [createPost] = useMutation<CreatePostResponse>(CREATE_POST);
  const [updatePost] = useMutation<UpdatePostResponse>(UPDATE_POST);

  const defaultValues = useMemo<PostFormValues>(() => ({
    postType: post?.postType ?? "job",
    title: post?.title ?? "",
    description: post?.description ?? "",
    content: post?.content ?? {},
    tags: post?.tags?.join(", ") ?? "",
    links: post?.links ? JSON.stringify(post.links, null, 2) : "{}",
    postedBy: post?.postedBy ?? "",
    imageLink: post?.imageLink ?? "",
    published: post?.published ?? false,
  }), [post]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (!session?.user?.name) return;

    const adminName = session.user.name.replace("Admin", "").trim();
	setValue("postedBy", getValues("postedBy") || adminName);
	 if (post) {
    reset({
      ...defaultValues,
      postedBy: defaultValues.postedBy || adminName,
    });
	}
  }, []);

  const onSubmit = async (values: PostFormValues) => {
    if (!selectedImage && !post?.imageLink && !values.imageLink) {
      alert("Please select an image");
      return;
    }

    let parsedLinks: Record<string, unknown>;

    try {
      parsedLinks = JSON.parse(values.links);
    } catch (err) {
      alert("Invalid JSON in Links field");
      return;
    }

    const input = {
      ...values,
      imageLink: selectedImage?.url || values.imageLink,
      tags: values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      links: parsedLinks,
    };

    showLoader();

    try {
      let result: Post;

      if (post) {
        const { data } = await updatePost({
          variables: { id: post.id, input },
        });

        if (!data) throw new Error("No data returned from update");
        result = data.updatePost;
      } else {
        const { data } = await createPost({
          variables: { input },
        });

        if (!data) throw new Error("No data returned from create");
        result = data.createPost;
      }

      onSuccess ? onSuccess(result) : router.push("/admin");
    } catch (error) {
      console.error(error);
      alert("Failed to save post");
    } finally {
      hideLoader();
    }
  };

  const formatPostForShare = (
    values: PostFormValues,
    platform: "whatsapp" | "telegram"
  ) => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com";
    const slug = post?.slug ?? "preview-slug";

    const tags = values.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .join(", ");

    const date = new Date().toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (platform === "whatsapp") {
      return `🔥 ${values.postType.toUpperCase()} UPDATE

*${values.title}*

${values.description}

📅 ${date}
🏷️ ${tags}

🔗 ${baseUrl}/${slug}`;
    }

    return `🚀 ${values.postType.toUpperCase()} UPDATE

**${values.title}**

${values.description}

📅 ${date}
🏷️ ${tags}

🔗 ${baseUrl}/${slug}`;
  };

  const handleCopyForPlatform = async (platform: "whatsapp" | "telegram") => {
    const values = getValues();

    const formatted = formatPostForShare(values, platform);

    try {
      await navigator.clipboard.writeText(formatted);
      alert(`copied for ${platform.toUpperCase()}`);
    } catch (err) {
      alert("Failed to copy");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Post Type */}
        <div className="col-span-full">
          <label className="block text-sm font-medium">Post Type</label>
          <input
            {...register("postType", { required: "Post type is required" })}
            className="input"
          />
          {errors.postType && (
            <p className="text-red-500 text-sm">{errors.postType.message}</p>
          )}
        </div>

        {/* Title */}
        <div className="col-span-full">
          <label className="block text-sm font-medium">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="input"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="col-span-full">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            rows={3}
            {...register("description", {
              required: "Description is required",
            })}
            className="input"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Content (Tiptap) */}
        <div className="col-span-full">
          <label className="block text-sm font-medium">Content</label>
          <Controller
            control={control}
            name="content"
            rules={{ required: true }}
            render={({ field }) => (
              <Tiptap
                content={field.value}
                onChange={(json) =>
                  field.onChange(json as Prisma.InputJsonValue)
                }
              />
            )}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium">
            Tags (comma separated)
          </label>
          <input
            {...register("tags")}
            className="input"
          />
        </div>

        {/* Posted By */}
        <div>
          <label className="block text-sm font-medium">Posted By</label>
          <input
            {...register("postedBy", {
              required: "Posted By is required",
            })}
            className="input"
          />
        </div>

        {/* Links JSON */}
        <div className="col-span-full">
          <label className="block text-sm font-medium">Links (JSON)</label>
          <textarea
            rows={4}
            {...register("links", {
              validate: (value) => {
                try {
                  JSON.parse(value);
                  return true;
                } catch {
                  return "Invalid JSON format";
                }
              },
            })}
            className="input font-mono text-sm"
          />
          {errors.links && (
            <p className="text-red-500 text-sm">{errors.links.message}</p>
          )}
        </div>

        {/* Featured Image */}
        <div className="col-span-full">
          <label className="block text-sm font-medium mb-2">
            Featured Image
          </label>

          <Controller
            control={control}
            name="imageLink"
            render={({ field }) => (
              <>
                {field.value && !selectedImage && (
                  <Image
                    src={field.value}
                    alt="Current"
                    width={100}
                    height={100}
                    className="h-48 w-96 object-contain rounded-md mb-4 border"
                  />
                )}

                <ImageUpload
                  selectedImage={selectedImage || undefined}
                  onImageSelect={(img) => {
                    setSelectedImage(img);
                    if (img?.url) setValue("imageLink", img.url);
                  }}
                />
              </>
            )}
          />
        </div>

        {/* Published */}
        <div className="flex items-center col-span-full">
          <input
            type="checkbox"
            {...register("published")}
            className="mr-2"
          />
          <label>Published</label>
        </div>
      </div>

      <div className="flex flex-col items-end gap-4 pt-4 border-t">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleCopyForPlatform("whatsapp")}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Copy for WhatsApp
          </button>

          <button
            type="button"
            onClick={() => handleCopyForPlatform("telegram")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Copy for Telegram
          </button>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {post ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  );
}