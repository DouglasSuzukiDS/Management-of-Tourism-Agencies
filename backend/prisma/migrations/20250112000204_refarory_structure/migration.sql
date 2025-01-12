/*
  Warnings:

  - Added the required column `adrress` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `Agency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `agency` ADD COLUMN `adrress` VARCHAR(191) NOT NULL,
    ADD COLUMN `uf` VARCHAR(191) NOT NULL;
