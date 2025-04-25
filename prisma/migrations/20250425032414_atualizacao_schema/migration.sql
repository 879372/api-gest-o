-- DropForeignKey
ALTER TABLE "Produto" DROP CONSTRAINT "Produto_cfopId_fkey";

-- DropForeignKey
ALTER TABLE "Produto" DROP CONSTRAINT "Produto_cstId_fkey";

-- DropForeignKey
ALTER TABLE "Produto" DROP CONSTRAINT "Produto_ncmId_fkey";

-- AlterTable
ALTER TABLE "Produto" ALTER COLUMN "cfopId" DROP NOT NULL,
ALTER COLUMN "cstId" DROP NOT NULL,
ALTER COLUMN "ncmId" DROP NOT NULL,
ALTER COLUMN "origem" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_cfopId_fkey" FOREIGN KEY ("cfopId") REFERENCES "CFOP"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_ncmId_fkey" FOREIGN KEY ("ncmId") REFERENCES "NCM"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_cstId_fkey" FOREIGN KEY ("cstId") REFERENCES "CST"("id") ON DELETE SET NULL ON UPDATE CASCADE;
