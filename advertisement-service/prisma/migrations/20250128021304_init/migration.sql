-- CreateTable
CREATE TABLE "advertisements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "gender_preference" TEXT NOT NULL,
    "allow_opposite_gender" BOOLEAN NOT NULL,
    "total_slots" INTEGER NOT NULL,
    "occupied_slots" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "bedroom_type" TEXT NOT NULL,
    "num_bedroom" INTEGER NOT NULL,
    "num_bathroom" INTEGER NOT NULL,
    "has_pet" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "img_src" TEXT,
    "owner_id" INTEGER NOT NULL,
    "state_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,
    CONSTRAINT "advertisements_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "advertisements_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "states" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uf" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "cities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "stateId" INTEGER NOT NULL,
    CONSTRAINT "cities_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "rules" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tag" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "amenities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tag" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AdvertisementRules" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AdvertisementRules_A_fkey" FOREIGN KEY ("A") REFERENCES "advertisements" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AdvertisementRules_B_fkey" FOREIGN KEY ("B") REFERENCES "rules" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AdvertisementAmenities" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AdvertisementAmenities_A_fkey" FOREIGN KEY ("A") REFERENCES "advertisements" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AdvertisementAmenities_B_fkey" FOREIGN KEY ("B") REFERENCES "amenities" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "states_uf_key" ON "states"("uf");

-- CreateIndex
CREATE UNIQUE INDEX "cities_name_stateId_key" ON "cities"("name", "stateId");

-- CreateIndex
CREATE UNIQUE INDEX "rules_tag_key" ON "rules"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "amenities_tag_key" ON "amenities"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "_AdvertisementRules_AB_unique" ON "_AdvertisementRules"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvertisementRules_B_index" ON "_AdvertisementRules"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AdvertisementAmenities_AB_unique" ON "_AdvertisementAmenities"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvertisementAmenities_B_index" ON "_AdvertisementAmenities"("B");
