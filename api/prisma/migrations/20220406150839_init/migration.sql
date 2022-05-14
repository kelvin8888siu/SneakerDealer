/*
  Warnings:

  - Added the required column `image` to the `Sneaker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Sneaker` ADD COLUMN `image` VARCHAR(255) NOT NULL;
