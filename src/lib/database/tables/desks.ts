import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { accounts } from "./accounts";

export const desks = sqliteTable(
  "desks",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),

    accountId: integer("account_id", { mode: "number" })
      .notNull()
      .references(() => accounts.id),
    name: text("name", { mode: "text" }).notNull(),
    xCoordinate: integer("x_coordinate", { mode: "number" }).notNull(),
    yCoordinate: integer("y_coordinate", { mode: "number" }).notNull(),

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
