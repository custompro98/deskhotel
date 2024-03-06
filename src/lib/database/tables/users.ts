import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),

    email: text("email", { mode: "text" }).notNull(),
    avatar: text("avatar", { mode: "text" }),

    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" }),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
  },
  (table) => {
    return {
      emailPartialIdx: uniqueIndex("email_partial_idx")
        .on(table.email)
        .where(sql`deleted_at IS NULL`),
    };
  },
);
