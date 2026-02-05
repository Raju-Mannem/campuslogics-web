import { imagekit } from "@/lib/imagekit";
// import sharp from "sharp";
// import fs from "fs";
// import path from "path";

export class ImageKitService {
    async uploadImage(file: File, fileName: string): Promise<{ url: string; publicId: string }> {
        try {
            const buffer = Buffer.from(await file.arrayBuffer());
            /*const baseImage = sharp(buffer);
            const metadata = await baseImage.metadata();

            const logoBuffer = await sharp(logoPath)
            .resize(Math.floor((metadata.width ?? 500) * 0.15))
            .toBuffer();

            const processedBuffer = await sharp(buffer)
                .composite([
                    {
                        input: logoBuffer,
                        top: 10,
                        left: 10,
                    },
                ])
                .toBuffer();
			*/
            const response = await imagekit.upload({
                file: buffer,
                fileName: fileName,
            });

            return {
                url: response.url,
                publicId: response.fileId,
            };
        } catch (error: unknown) {
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
