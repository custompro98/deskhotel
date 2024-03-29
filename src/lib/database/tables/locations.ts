import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { accounts } from "./accounts";
import { desks } from "./desks";

export const locations = sqliteTable(
  "locations",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),

    accountId: integer("account_id", { mode: "number" })
      .notNull()
      .references(() => accounts.id),
    name: text("name", { mode: "text" }).notNull(),

    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" }),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
  },
  (table) => {
    return {
      locationsNamePartialIdx: uniqueIndex("locations_name_partial_idx")
        .on(table.name)
        .where(sql`deleted_at IS NULL`),
    };
  },
);

export const locationGrids = sqliteTable("location_grids", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),

  locationId: integer("location_id", { mode: "number" })
    .notNull()
    .references(() => locations.id),
  sizeX: integer("size_x", { mode: "number" }).notNull(),
  sizeY: integer("size_y", { mode: "number" }).notNull(),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export const locationGridEntities = sqliteTable("location_grid_entities", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),

  locationGridId: integer("location_grid_id", { mode: "number" })
    .notNull()
    .references(() => locationGrids.id),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export const locationGridEntityDesk = sqliteTable("location_grid_entity_desk", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),

  locationGridEntityId: integer("location_grid_entity_id", { mode: "number" })
    .notNull()
    .references(() => locationGridEntities.id),
  deskId: integer("desk_id", { mode: "number" })
    .notNull()
    .references(() => desks.id),

  positionX: integer("position_x").notNull(),
  positionY: integer("position_y").notNull(),
});

export const locationGridEntityWall = sqliteTable("location_grid_entity_wall", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),

  locationGridEntityId: integer("location_grid_entity_id", { mode: "number" })
    .notNull()
    .references(() => locationGridEntities.id),

  positionX: integer("position_x").notNull(),
  positionY: integer("position_y").notNull(),
});
