-- CreateTable
CREATE TABLE "FormaPagamento" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "FormaPagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PagamentoVenda" (
    "id" SERIAL NOT NULL,
    "vendaId" INTEGER NOT NULL,
    "formaPagamentoId" INTEGER NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "PagamentoVenda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormaPagamento_descricao_key" ON "FormaPagamento"("descricao");

-- AddForeignKey
ALTER TABLE "PagamentoVenda" ADD CONSTRAINT "PagamentoVenda_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagamentoVenda" ADD CONSTRAINT "PagamentoVenda_formaPagamentoId_fkey" FOREIGN KEY ("formaPagamentoId") REFERENCES "FormaPagamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
