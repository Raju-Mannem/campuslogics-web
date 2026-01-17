
import { prisma } from "@/lib/prisma/client";
import { ImageKitService } from "@/services/imagekit-service";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

interface Context {
    params: Promise<{
        id: string;
    }>;
}

export async function DELETE(
    request: Request,
    { params }: Context
) {
    try {
        const { id } = await params;
        const imageId = parseInt(id);

        if (isNaN(imageId)) {
            return NextResponse.json({ message: "Invalid image ID" }, { status: 400 });
        }

        const image = await prisma.image.findUnique({
            where: { id: imageId },
        });

        if (!image) {
            return NextResponse.json({ message: "Image not found" }, { status: 404 });
        }

        // Delete from ImageKit
        if (image.publicId) {
            const imageKitService = new ImageKitService();
            await imageKitService.deleteImage(image.publicId);
        }

        // Delete from Database
        await prisma.image.delete({
            where: { id: imageId },
        });

        return NextResponse.json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json(
            { message: "Failed to delete image" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: Context
) {
    try {
        const { id } = await params;
        const imageId = parseInt(id);

        if (isNaN(imageId)) {
            return NextResponse.json({ message: "Invalid image ID" }, { status: 400 });
        }

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ message: "No file provided" }, { status: 400 });
        }

        const image = await prisma.image.findUnique({
            where: { id: imageId },
        });

        if (!image) {
            return NextResponse.json({ message: "Image not found" }, { status: 404 });
        }

        const imageKitService = new ImageKitService();

        // 1. Delete old image from ImageKit
        if (image.publicId) {
            try {
                await imageKitService.deleteImage(image.publicId);
            } catch (e) {
                console.warn("Failed to delete old image from ImageKit, proceeding with upload", e);
            }
        }

        // 2. Upload new image
        const uploadResult = await imageKitService.uploadImage(file, file.name, "public/logo.png");

        // 3. Update Database
        const updatedImage = await prisma.image.update({
            where: { id: imageId },
            data: {
                url: uploadResult.url,
                publicId: uploadResult.publicId,
                name: file.name,
                uploadedAt: new Date(),
            },
        });

        return NextResponse.json(updatedImage);

    } catch (error) {
        console.error("Replace error:", error);
        return NextResponse.json(
            { message: "Failed to replace image" },
            { status: 500 }
        );
    }
}
