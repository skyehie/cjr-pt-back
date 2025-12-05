/*
  Warnings:

  - You are about to drop the column `fotoPerfilUrl` on the `Loja` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Loja" DROP COLUMN "fotoPerfilUrl",
ADD COLUMN     "foto_perfil_url" TEXT;
