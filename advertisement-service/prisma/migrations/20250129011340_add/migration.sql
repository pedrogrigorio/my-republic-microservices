-- CreateTable
CREATE TABLE "owners" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_advertisements" (
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
    CONSTRAINT "advertisements_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "owners" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "advertisements_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "advertisements_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_advertisements" ("allow_opposite_gender", "bedroom_type", "city_id", "description", "gender_preference", "has_pet", "id", "img_src", "is_active", "num_bathroom", "num_bedroom", "occupied_slots", "owner_id", "phone", "price", "state_id", "title", "total_slots") SELECT "allow_opposite_gender", "bedroom_type", "city_id", "description", "gender_preference", "has_pet", "id", "img_src", "is_active", "num_bathroom", "num_bedroom", "occupied_slots", "owner_id", "phone", "price", "state_id", "title", "total_slots" FROM "advertisements";
DROP TABLE "advertisements";
ALTER TABLE "new_advertisements" RENAME TO "advertisements";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
