-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" VARCHAR(25),
ALTER COLUMN "name" DROP NOT NULL;
