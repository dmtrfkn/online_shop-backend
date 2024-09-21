/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WishList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CartProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductComments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CartProducts" DROP CONSTRAINT "_CartProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartProducts" DROP CONSTRAINT "_CartProducts_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductComments" DROP CONSTRAINT "_ProductComments_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductComments" DROP CONSTRAINT "_ProductComments_B_fkey";

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "WishList";

-- DropTable
DROP TABLE "_CartProducts";

-- DropTable
DROP TABLE "_ProductComments";
