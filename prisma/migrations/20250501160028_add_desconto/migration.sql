-- AlterTable
ALTER TABLE "VendaItem" ADD COLUMN     "tipoDesconto" TEXT,
ADD COLUMN     "valorDesconto" DECIMAL(10,2),
ALTER COLUMN "subtotal" DROP NOT NULL;
