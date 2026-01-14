import { prisma } from "@/lib/prisma/client";
import { ImageKitService } from "@/services/imagekit-service";

export const runtime = 'nodejs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const imageKitService = new ImageKitService();

    // For file uploads, you would use a library like multer or next-connect
    // This is a simplified version
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;

    if (!file || !name) {
      return new Response(
        JSON.stringify({ message: "File and name are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const uploadResult = await imageKitService.uploadImage(file, name);

    const image = await prisma.image.create({
      data: {
        name,
        url: uploadResult.url,
        publicId: uploadResult.publicId,
      },
    });

    return new Response(JSON.stringify(image), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
