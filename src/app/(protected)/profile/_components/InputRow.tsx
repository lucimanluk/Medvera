import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface InputRowProps {
  label_name1: string;
  label_name2: string;
  inputType1?: string;
  inputType2?: string;
  type: string[];
  data1?: string[];
  data2?: string[];
}

export default function InputRow({
  label_name1,
  label_name2,
  inputType1,
  inputType2,
  type,
  data1,
  data2,
}: InputRowProps) {
  return (
    <div className="mb-4 flex flex-row justify-between gap-8">
      <form className="flex w-full flex-col gap-2">
        <Label>{label_name1}</Label>
        {type[0] === "input" ? (
          <Input type={inputType1}></Input>
        ) : (
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {data1?.map((entry, index) => (
                <SelectItem key={index} value={entry}>
                  {entry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </form>
      <form className="flex w-full flex-col gap-2">
        <Label>{label_name2}</Label>
        {type[1] === "input" ? (
          <Input type={inputType2}></Input>
        ) : (
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {data2?.map((entry, index) => (
                <SelectItem key={index} value={entry}>
                  {entry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </form>
    </div>
  );
}
