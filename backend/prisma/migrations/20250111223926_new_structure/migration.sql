/*
  Warnings:

  - You are about to drop the column `login` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fantasyName` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foundation` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registerState` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_login_key` ON `user`;

-- AlterTable
ALTER TABLE `agency` ADD COLUMN `cnpj` INTEGER NOT NULL,
    ADD COLUMN `fantasyName` VARCHAR(191) NOT NULL,
    ADD COLUMN `foundation` VARCHAR(191) NOT NULL,
    ADD COLUMN `registerState` INTEGER NOT NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `login`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
