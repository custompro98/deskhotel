import { sql } from "drizzle-orm";
import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { accountUsers } from "./accounts";
import { desks } from "./desks";

export const bookings = sqliteTable("bookings", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),

  accountUserId: integer("account_user_id", { mode: "number" })
    .notNull()
    .references(() => accountUsers.id),
  deskId: integer("desk_id", { mode: "number" })
    .notNull()
    .references(() => desks.id),

  startTime: integer("start_time", { mode: "timestamp" }).notNull(),
  endTime: integer("end_time", { mode: "timestamp" }).notNull(),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});
