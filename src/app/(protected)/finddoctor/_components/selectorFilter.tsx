import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function SelectorFilter({
  value,
  setValue,
  appointments,
}: {
  value: string;
  setValue: (newValue: string) => void;
  appointments: string[];
}) {
  return (
    <Select
      onValueChange={(newVal: string) => {
        setValue(newVal);
      }}
      defaultValue={appointments[0]}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {appointments.map((appointment, index) => (
          <SelectItem key={index} value={appointment}>
            {appointment}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
