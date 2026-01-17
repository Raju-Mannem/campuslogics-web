/*
  Warnings:

  - You are about to drop the column `type` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blog"."Posts" DROP COLUMN "type",
ADD COLUMN     "postType" TEXT NOT NULL DEFAULT 'job';
