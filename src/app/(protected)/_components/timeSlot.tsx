export default function TimeSlot({ hour }: { hour: string }) {
  return (
    <div className="flex w-full items-center justify-center rounded-full bg-blue-500 text-xl text-white hover:bg-blue-600 hover:text-white">
      {hour}
    </div>
  );
}
