-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "paisResidencia" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Municipality" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precioM2Promedio" INTEGER NOT NULL,
    "valorizacionPct" REAL NOT NULL,
    "calidadDeVida" TEXT NOT NULL,
    "nivelValorizacion" TEXT NOT NULL,
    "tipoRecomendado" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "heroImage" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ally" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "municipios" TEXT NOT NULL,
    "verificado" BOOLEAN NOT NULL DEFAULT true,
    "aniosExperiencia" INTEGER NOT NULL,
    "proyectosEntregados" INTEGER NOT NULL,
    "logoInitial" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "municipioId" TEXT NOT NULL,
    "allyId" TEXT NOT NULL,
    "precioDesde" INTEGER NOT NULL,
    "areaM2" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "estadoProyecto" TEXT NOT NULL,
    "rentabilidadEstimada" REAL NOT NULL,
    "entrega" TEXT NOT NULL,
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "verificado" BOOLEAN NOT NULL DEFAULT true,
    "amenidades" TEXT NOT NULL,
    CONSTRAINT "Property_municipioId_fkey" FOREIGN KEY ("municipioId") REFERENCES "Municipality" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Property_allyId_fkey" FOREIGN KEY ("allyId") REFERENCES "Ally" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InvestmentPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "pais" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "ingresosMensuales" INTEGER NOT NULL,
    "ahorros" INTEGER NOT NULL,
    "capitalDisponible" INTEGER NOT NULL,
    "meta" TEXT NOT NULL,
    "tiempoAnios" INTEGER NOT NULL,
    "tipoPropiedad" TEXT NOT NULL,
    "cuotaInicialEstimada" INTEGER NOT NULL,
    "capacidadCompra" INTEGER NOT NULL,
    "ahorroMensualSugerido" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InvestmentPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Favorite_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "allyId" TEXT,
    "propertyId" TEXT,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "origen" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'nuevo',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Lead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Lead_allyId_fkey" FOREIGN KEY ("allyId") REFERENCES "Ally" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Lead_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Reminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Municipality_slug_key" ON "Municipality"("slug");

-- CreateIndex
CREATE INDEX "Municipality_slug_idx" ON "Municipality"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Ally_slug_key" ON "Ally"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Property_slug_key" ON "Property"("slug");

-- CreateIndex
CREATE INDEX "Property_municipioId_idx" ON "Property"("municipioId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_propertyId_key" ON "Favorite"("userId", "propertyId");
