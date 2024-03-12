"use client";

import classNames from "classnames";
import { useState, useTransition } from "react";
import { toggleCoordinate } from "./actions";

interface Props {
  gridId: number;
  posX: number;
  posY: number;
  occupied: boolean;
}

export function Coordinate({ gridId, posX, posY, occupied }: Props) {
  const [, startTransition] = useTransition();
  const [isOccupied, setIsOccupied] = useState(occupied);

  const classes = classNames({
    "h-16": true,
    "w-16": true,
    border: true,
    "border-black": true,
    "bg-black": isOccupied,
  });

  return (
    <div
      className={classes}
      onClick={() => {
        startTransition(async () => {
          setIsOccupied(!isOccupied);

          await toggleCoordinate({
            gridId,
            posX,
            posY,
            isCurrentlyOccupied: occupied,
          });
        });
      }}
    ></div>
  );
}
