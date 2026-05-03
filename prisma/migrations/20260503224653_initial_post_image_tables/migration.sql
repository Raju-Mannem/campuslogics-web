-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "sno" SERIAL NOT NULL,
    "postType" TEXT NOT NULL DEFAULT 'job',
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageLink" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" JSON NOT NULL,
    "links" JSONB NOT NULL,
    "tags" TEXT[],
    "postedBy" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Posts_slug_key" ON "Posts"("slug");

-- CreateIndex
CREATE INDEX "Posts_published_createdAt_idx" ON "Posts"("published", "createdAt");
