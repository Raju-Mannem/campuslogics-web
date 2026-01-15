-- CreateIndex
CREATE INDEX "Posts_published_createdAt_idx" ON "blog"."Posts"("published", "createdAt");
