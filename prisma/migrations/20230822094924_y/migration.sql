/*
  Warnings:

  - Added the required column `gender` to the `faculty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "faculty" ADD COLUMN     "gender" TEXT NOT NULL;
