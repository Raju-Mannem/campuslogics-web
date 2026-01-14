import { prisma } from "@/lib/prisma/client";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const images = await prisma.image.findMany({
            orderBy: {
                uploadedAt: 'desc',
            },
        });

        return NextResponse.json(images);
    } catch (error) {
        console.error("Failed to fetch images:", error);
        return NextResponse.json(
            { message: "Failed to fetch images" },
            { status: 500 }
        );
    }
}
