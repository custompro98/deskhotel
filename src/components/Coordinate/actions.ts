"use server";

import { createWall, deleteWall } from "@/lib/repository/location";
import { revalidatePath } from "next/cache";

interface Props {
  isCurrentlyOccupied: boolean;
  gridId: number;
  posX: number;
  posY: number;
}

export async function toggleCoordinate({
  isCurrentlyOccupied,
  gridId,
  posX,
  posY,
}: Props) {
  if (isCurrentlyOccupied) {
    await deleteWall(gridId, posX, posY);
  } else {
    await createWall(gridId, posX, posY);
  }
}
