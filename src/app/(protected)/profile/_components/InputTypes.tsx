import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";

export default function InputTypes({
  label_name,
  value,
  setValue,
  editing,
}: {
  label_name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  editing: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label_name}</Label>
      <div className="flex w-full flex-row gap-2">
        <Input
          className="w-full"
          placeholder="Add affliction...  "
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!editing}
        ></Input>
        <Button
          className="w-1/10 bg-[#2F80ED] text-white hover:bg-[#1366d6]"
          disabled={!editing || value == ""}
        >
          Add information
        </Button>
      </div>
    </div>
  );
}
