import { and, eq, isNull, sql } from "drizzle-orm";
import { db } from "../database";
import {
  accounts,
  locationGridEntities,
  locationGridEntityWall,
  locationGrids,
  locations,
} from "../database/tables";
import { isPresent } from "../util";

export async function createLocation() {
  const [account] = await db
    .select()
    .from(accounts)
    .where(isNull(accounts.deletedAt))
    .limit(1)
    .execute();

  await db.transaction(async (trx) => {
    const [location] = await trx
      .insert(locations)
      .values({
        name: "Default",
        accountId: account.id,
      })
      .returning();

    await trx
      .insert(locationGrids)
      .values({
        sizeX: 5,
        sizeY: 5,
        locationId: location.id,
      })
      .returning();
  });
}

export async function createLocationEntity(
  locationGridId: number,
  posX: number,
  posY: number,
) {
  await db.transaction(async (trx) => {
    const [entity] = await trx
      .insert(locationGridEntities)
      .values({
        locationGridId: locationGridId,
      })
      .returning();

    await trx
      .insert(locationGridEntityWall)
      .values({
        locationGridEntityId: entity.id,
        positionX: posX,
        positionY: posY,
      })
      .returning();
  });
}

export async function getLocation(id: number) {
  const [location] = await db
    .select()
    .from(locations)
    .where(and(eq(locations.id, id), isNull(locations.deletedAt)))
    .limit(1);

  if (!isPresent(location)) {
    return;
  }

  const [grid] = await db
    .select()
    .from(locationGrids)
    .where(
      and(
        eq(locationGrids.locationId, location.id),
        isNull(locationGrids.deletedAt),
      ),
    )
    .limit(1);

  if (!isPresent(grid)) {
    return;
  }

  const walls = await db
    .select()
    .from(locationGridEntities)
    .innerJoin(
      locationGridEntityWall,
      eq(locationGridEntityWall.locationGridEntityId, locationGridEntities.id),
    )
    .where(
      and(
        eq(locationGridEntities.locationGridId, grid.id),
        isNull(locationGridEntities.deletedAt),
      ),
    );

  return {
    ...location,
    grid,
    walls,
  };
}

export async function createWall(gridId: number, posX: number, posY: number) {
  const [grid] = await db
    .select()
    .from(locationGrids)
    .where(and(eq(locationGrids.id, gridId), isNull(locationGrids.deletedAt)));

  if (!isPresent(grid)) {
    return;
  }

  if (posX >= grid.sizeX || posY >= grid.sizeY) {
    return;
  }

  await db.transaction(async (trx) => {
    const [entity] = await trx
      .insert(locationGridEntities)
      .values({
        locationGridId: grid.id,
      })
      .returning();

    await trx
      .insert(locationGridEntityWall)
      .values({
        locationGridEntityId: entity.id,
        positionX: posX,
        positionY: posY,
      })
      .returning();
  });
}

export async function deleteWall(gridId: number, posX: number, posY: number) {
  const [grid] = await db
    .select()
    .from(locationGrids)
    .where(and(eq(locationGrids.id, gridId), isNull(locationGrids.deletedAt)));

  if (!isPresent(grid)) {
    return;
  }

  if (posX >= grid.sizeX || posY >= grid.sizeY) {
    return;
  }

  const [entity] = await db
    .select()
    .from(locationGridEntities)
    .innerJoin(
      locationGridEntityWall,
      eq(locationGridEntityWall.locationGridEntityId, locationGridEntities.id),
    )
    .where(
      and(
        eq(locationGridEntities.locationGridId, grid.id),
        eq(locationGridEntityWall.positionX, posX),
        eq(locationGridEntityWall.positionY, posY),
        isNull(locationGridEntities.deletedAt),
      ),
    )
    .limit(1);

  if (!isPresent(entity)) {
    return;
  }

  const [updatedEntity] = await db
    .update(locationGridEntities)
    .set({
      deletedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(locationGridEntities.id, entity.location_grid_entities.id))
    .returning();
}
