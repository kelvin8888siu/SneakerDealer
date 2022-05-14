/*
  Warnings:

  - You are about to alter the column `size` on the `Sneaker` table. The data in that column could be lost. The data in that column will be cast from `Float` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE `Sneaker` MODIFY `size` VARCHAR(255) NOT NULL;
