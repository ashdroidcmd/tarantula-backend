-- CreateTable
CREATE TABLE "test" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
