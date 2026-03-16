/*
  Warnings:

  - The `image_id` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `CourseImages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CourseImages` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_image_id_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "image_id",
ADD COLUMN     "image_id" INTEGER;

-- AlterTable
ALTER TABLE "CourseImages" DROP CONSTRAINT "CourseImages_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CourseImages_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Course_image_id_key" ON "Course"("image_id");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "CourseImages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
