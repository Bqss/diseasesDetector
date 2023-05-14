/*
  Warnings:

  - The primary key for the `gejala` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `gejala` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `penyakit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `penyakit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `penyakit_gejala` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_relation` on the `penyakit_gejala` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_penyakit` on the `penyakit_gejala` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_gejala` on the `penyakit_gejala` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `penyakit_gejala` DROP FOREIGN KEY `Penyakit_gejala_id_gejala_fkey`;

-- DropForeignKey
ALTER TABLE `penyakit_gejala` DROP FOREIGN KEY `Penyakit_gejala_id_penyakit_fkey`;

-- AlterTable
ALTER TABLE `gejala` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `penyakit` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `penyakit_gejala` DROP PRIMARY KEY,
    MODIFY `id_relation` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_penyakit` INTEGER NOT NULL,
    MODIFY `id_gejala` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id_relation`);

-- AddForeignKey
ALTER TABLE `Penyakit_gejala` ADD CONSTRAINT `Penyakit_gejala_id_penyakit_fkey` FOREIGN KEY (`id_penyakit`) REFERENCES `Penyakit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penyakit_gejala` ADD CONSTRAINT `Penyakit_gejala_id_gejala_fkey` FOREIGN KEY (`id_gejala`) REFERENCES `Gejala`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
