/*
  Warnings:

  - You are about to alter the column `price` on the `Sneaker` table. The data in that column could be lost. The data in that column will be cast from `Float` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE `Sneaker` MODIFY `price` VARCHAR(255) NOT NULL,
    MODIFY `image` VARCHAR(255) NULL;
