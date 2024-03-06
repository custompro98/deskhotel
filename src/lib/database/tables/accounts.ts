import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const accounts = sqliteTable("accounts", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),

  name: text("name", { mode: "text" }).notNull(),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export const accountUsers = sqliteTable("account_users", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),

  accountId: integer("account_id", { mode: "number" })
    .notNull()
    .references(() => accounts.id),
  userId: integer("user_id", { mode: "number" })
    .notNull()
    .references(() => users.id),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});
