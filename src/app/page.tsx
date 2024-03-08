import { Coordinate } from "@/components/Coordinate";
import { createLocation, getLocation } from "@/lib/repository/location";
import { isPresent } from "@/lib/util";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const location = await getLocation(1);

  if (!isPresent(location)) {
    return (
      <form
        action={async () => {
          "use server";

          await createLocation();
          revalidatePath("/");
        }}
        className="mb-2"
      >
        <button className="border border-flame-500 rounded p-1">
          Create location
        </button>
      </form>
    );
  }

  return (
    <div className="flex flex-col">
      {[...Array(location.grid.sizeY)].map((_, y) => (
        <div className="flex flex-row" key={`${y}`}>
          {[...Array(location.grid.sizeX)].map((_, x) => {
            const isOccupied = Boolean(
              location.walls.find(
                (wall) =>
                  wall.location_grid_entity_wall.positionX === x &&
                  wall.location_grid_entity_wall.positionY === y,
              ),
            );

            return (
              <Coordinate
                key={`${x},${y}`}
                occupied={isOccupied}
                gridId={location.grid.id}
                posX={x}
                posY={y}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
