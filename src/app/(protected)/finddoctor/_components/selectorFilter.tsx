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
  order,
}: {
  value: string;
  setValue: (newValue: string) => void;
  order: string[];
}) {
  return (
    <Select
      onValueChange={(newVal: string) => {
        setValue(newVal);
      }}
      defaultValue={order[0]}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {order.map((order, index) => (
          <SelectItem key={index} value={order}>
            {order}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
