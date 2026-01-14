import { imagekit } from "@/lib/imagekit";

export class ImageKitService {
    async uploadImage(file: File, fileName: string): Promise<{ url: string; publicId: string }> {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const response = await imagekit.upload({
                file: buffer,
                fileName: fileName,
            });

            return {
                url: response.url,
                publicId: response.fileId,
            };
        } catch (error) {
            console.error("ImageKit upload failed:", error);
            throw new Error("Failed to upload image to ImageKit");
        }
    }

    async deleteImage(publicId: string): Promise<void> {
        try {
            await imagekit.deleteFile(publicId);
        } catch (error) {
            console.error("ImageKit delete failed:", error);
            throw new Error("Failed to delete image from ImageKit");
        }
    }
}
