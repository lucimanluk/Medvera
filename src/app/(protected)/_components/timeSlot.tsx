import { cn } from "~/lib/utils";

export default function TimeSlot({
  hour,
  selected,
  onClick,
}: {
  hour?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-center rounded-full bg-blue-500 text-xl text-white hover:text-white",
        selected === true ? "bg-black" : "hover:bg-blue-600",
      )}
    >
      {hour}
    </button>
  );
}
