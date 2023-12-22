-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "descripcionEn" TEXT NOT NULL,
    "descripcionEs" TEXT NOT NULL,
    "origen" TEXT NOT NULL,
    "stateId" INTEGER NOT NULL,
    "marca" TEXT NOT NULL,
    "precioTm" DOUBLE PRECISION NOT NULL,
    "pesoKg" DOUBLE PRECISION NOT NULL,
    "pesoLibras" DOUBLE PRECISION NOT NULL,
    "totalPrecio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
