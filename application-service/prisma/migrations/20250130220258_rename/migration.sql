/*
  Warnings:

  - You are about to drop the `Advertisement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Applicant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Advertisement";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Applicant";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "applicants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img_src" TEXT
);

-- CreateTable
CREATE TABLE "advertisements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "img_src" TEXT,
    "price" REAL NOT NULL,
    "city_name" TEXT NOT NULL,
    "state_uf" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_applications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT,
    "applicant_id" INTEGER NOT NULL,
    "advertisement_id" INTEGER NOT NULL,
    CONSTRAINT "applications_advertisement_id_fkey" FOREIGN KEY ("advertisement_id") REFERENCES "advertisements" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "applications_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "applicants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_applications" ("advertisement_id", "applicant_id", "created_at", "id", "message", "status") SELECT "advertisement_id", "applicant_id", "created_at", "id", "message", "status" FROM "applications";
DROP TABLE "applications";
ALTER TABLE "new_applications" RENAME TO "applications";
CREATE UNIQUE INDEX "applications_applicant_id_advertisement_id_key" ON "applications"("applicant_id", "advertisement_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
