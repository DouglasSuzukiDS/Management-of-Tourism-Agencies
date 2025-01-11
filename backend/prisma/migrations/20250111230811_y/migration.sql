/*
  Warnings:

  - Added the required column `contact` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Agency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `agency` ADD COLUMN `contact` INTEGER NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;
