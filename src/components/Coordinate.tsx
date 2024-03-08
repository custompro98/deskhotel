import classNames from "classnames";

interface Props {
  occupied: boolean;
  handleClick: () => Promise<void>;
}

export function Coordinate({ occupied, handleClick }: Props) {
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

        await handleClick();
      }}
    >
      <button className={classes}></button>
    </form>
  );
}
