import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { locations } from "./locations";

export const desks = sqliteTable(
  "desks",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),

    locationId: integer("location_id", { mode: "number" })
      .notNull()
      .references(() => locations.id),
    name: text("name", { mode: "text" }).notNull(),

    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" }),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
  },
  (table) => {
    return {
      desksNamePartialIdx: uniqueIndex("desks_name_partial_idx")
        .on(table.name)
        .where(sql`deleted_at IS NULL`),
    };
  },
);
