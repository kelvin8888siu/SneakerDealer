-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Sneaker` DROP FOREIGN KEY `Sneaker_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_userId_fkey`;

-- AlterTable
ALTER TABLE `Review` MODIFY `userId` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Sneaker` MODIFY `userId` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Transaction` MODIFY `userId` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `Sneaker` ADD CONSTRAINT `Sneaker_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`auth0Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`auth0Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`auth0Id`) ON DELETE CASCADE ON UPDATE CASCADE;
