/*
  Warnings:

  - You are about to drop the column `cnpj` on the `Empresa` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[documento]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `documento` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Empresa_cnpj_key";

-- AlterTable
ALTER TABLE "Empresa" DROP COLUMN "cnpj",
ADD COLUMN     "bairro" TEXT,
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "documento" TEXT NOT NULL,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fantasia" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "telefone" TEXT,
ADD COLUMN     "tipo" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT,
ALTER COLUMN "endereco" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_documento_key" ON "Empresa"("documento");
