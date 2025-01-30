-- CreateTable
CREATE TABLE "applications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT,
    "applicant_id" INTEGER NOT NULL,
    "advertisement_id" INTEGER NOT NULL,
    CONSTRAINT "applications_advertisement_id_fkey" FOREIGN KEY ("advertisement_id") REFERENCES "Advertisement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "applications_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "Applicant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Applicant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img_src" TEXT
);

-- CreateTable
CREATE TABLE "Advertisement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "img_src" TEXT,
    "price" REAL NOT NULL,
    "city_name" TEXT NOT NULL,
    "state_uf" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "applications_applicant_id_advertisement_id_key" ON "applications"("applicant_id", "advertisement_id");
