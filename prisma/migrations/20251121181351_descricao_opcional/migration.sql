-- AlterTable
ALTER TABLE "Loja" ADD COLUMN     "categoria" TEXT,
ADD COLUMN     "fotoPerfilUrl" TEXT,
ALTER COLUMN "logo_url" DROP NOT NULL,
ALTER COLUMN "banner_url" DROP NOT NULL,
ALTER COLUMN "sticker_url" DROP NOT NULL;
