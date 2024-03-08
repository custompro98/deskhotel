import classNames from "classnames";
import { toggleCoordinate } from "./actions";
import { revalidatePath } from "next/cache";
import { useState } from "react";

interface Props {
  gridId: number;
  posX: number;
  posY: number;
  occupied: boolean;
}

export function Coordinate({ gridId, posX, posY, occupied }: Props) {
  const classes = classNames({
    "h-16": true,
    "w-16": true,
    border: true,
    "border-black": true,
    "bg-black": occupied,
  });

  return (
    <form
      action={async () => {
        "use server";

        await toggleCoordinate({
          gridId,
          posX,
          posY,
          isCurrentlyOccupied: occupied,
        });

        revalidatePath("/");
      }}
    >
      <button className={classes}></button>
    </form>
  );
}
