/*
  Warnings:

  - You are about to drop the `Pedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Venda` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[documento]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `documento` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regimeTributario` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cfopId` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cstId` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ncmId` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origem` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidade` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_vendaId_fkey";

-- DropForeignKey
ALTER TABLE "Venda" DROP CONSTRAINT "Venda_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "Venda" DROP CONSTRAINT "Venda_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "Venda" DROP CONSTRAINT "Venda_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "bairro" TEXT,
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "documento" TEXT NOT NULL,
ADD COLUMN     "endereco" TEXT,
ADD COLUMN     "inscricaoEstadual" TEXT,
ADD COLUMN     "tipo" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT;

-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "csc" TEXT,
ADD COLUMN     "cscId" TEXT,
ADD COLUMN     "inscricaoEstadual" TEXT,
ADD COLUMN     "inscricaoMunicipal" TEXT,
ADD COLUMN     "regimeTributario" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "cfopId" INTEGER NOT NULL,
ADD COLUMN     "csosnId" INTEGER,
ADD COLUMN     "cstId" INTEGER NOT NULL,
ADD COLUMN     "ncmId" INTEGER NOT NULL,
ADD COLUMN     "origem" TEXT NOT NULL,
ADD COLUMN     "unidade" TEXT NOT NULL;

-- DropTable
DROP TABLE "Pedido";

-- DropTable
DROP TABLE "Venda";

-- CreateTable
CREATE TABLE "NotaFiscal" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "serie" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "naturezaOperacao" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "ambiente" TEXT NOT NULL,
    "chaveAcesso" TEXT NOT NULL,
    "dataEmissao" TIMESTAMP(3) NOT NULL,
    "valorProdutos" DECIMAL(10,2) NOT NULL,
    "valorTotal" DECIMAL(10,2) NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "empresaId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "xml" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotaFiscal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotaProduto" (
    "id" SERIAL NOT NULL,
    "notaFiscalId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valorUnitario" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "cfopId" INTEGER NOT NULL,
    "ncmId" INTEGER NOT NULL,
    "cstId" INTEGER NOT NULL,
    "csosnId" INTEGER,
    "icms" DECIMAL(5,2),
    "pis" DECIMAL(5,2),
    "cofins" DECIMAL(5,2),

    CONSTRAINT "NotaProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CFOP" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "CFOP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NCM" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "NCM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CST" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "CST_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CSOSN" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "CSOSN_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotaFiscal_chaveAcesso_key" ON "NotaFiscal"("chaveAcesso");

-- CreateIndex
CREATE UNIQUE INDEX "CFOP_codigo_key" ON "CFOP"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "NCM_codigo_key" ON "NCM"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "CST_codigo_key" ON "CST"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "CSOSN_codigo_key" ON "CSOSN"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_documento_key" ON "Cliente"("documento");

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_cfopId_fkey" FOREIGN KEY ("cfopId") REFERENCES "CFOP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_ncmId_fkey" FOREIGN KEY ("ncmId") REFERENCES "NCM"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_cstId_fkey" FOREIGN KEY ("cstId") REFERENCES "CST"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_csosnId_fkey" FOREIGN KEY ("csosnId") REFERENCES "CSOSN"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaFiscal" ADD CONSTRAINT "NotaFiscal_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaFiscal" ADD CONSTRAINT "NotaFiscal_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaProduto" ADD CONSTRAINT "NotaProduto_notaFiscalId_fkey" FOREIGN KEY ("notaFiscalId") REFERENCES "NotaFiscal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaProduto" ADD CONSTRAINT "NotaProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaProduto" ADD CONSTRAINT "NotaProduto_cfopId_fkey" FOREIGN KEY ("cfopId") REFERENCES "CFOP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaProduto" ADD CONSTRAINT "NotaProduto_ncmId_fkey" FOREIGN KEY ("ncmId") REFERENCES "NCM"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaProduto" ADD CONSTRAINT "NotaProduto_cstId_fkey" FOREIGN KEY ("cstId") REFERENCES "CST"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaProduto" ADD CONSTRAINT "NotaProduto_csosnId_fkey" FOREIGN KEY ("csosnId") REFERENCES "CSOSN"("id") ON DELETE SET NULL ON UPDATE CASCADE;
