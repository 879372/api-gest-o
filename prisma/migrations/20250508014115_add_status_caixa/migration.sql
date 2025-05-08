/*
  Warnings:

  - Made the column `caixaId` on table `Venda` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Venda" DROP CONSTRAINT "Venda_caixaId_fkey";

-- AlterTable
ALTER TABLE "Caixa" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ABERTO';

-- AlterTable
ALTER TABLE "Venda" ALTER COLUMN "caixaId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_caixaId_fkey" FOREIGN KEY ("caixaId") REFERENCES "Caixa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
