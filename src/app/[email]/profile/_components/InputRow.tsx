import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function InputRow({
  label_name1,
  label_name2,
}: {
  label_name1: string;
  label_name2: string;
}) {
  return (
    <div className="mb-4 flex flex-row justify-between gap-8">
      <form className="flex w-full flex-col gap-2">
        <Label>{label_name1}</Label>
        <Input></Input>
      </form>
      <form className="flex w-full flex-col gap-2">
        <Label>{label_name2}</Label>
        <Input></Input>
      </form>
    </div>
  );
}
