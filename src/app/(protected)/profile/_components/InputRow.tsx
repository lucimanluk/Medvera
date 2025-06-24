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
  editing: boolean;
}

export default function InputRow({
  label_name1,
  label_name2,
  inputType1,
  inputType2,
  type,
  data1,
  data2,
  editing,
}: InputRowProps) {
  return (
    <div className="flex flex-row justify-between gap-8">
      <div className="flex w-full flex-col gap-2">
        <Label>{label_name1}</Label>
        {type[0] === "input" ? (
          <Input
            type={inputType1}
            disabled={inputType1 === "email" ? true : !editing}
          ></Input>
        ) : (
          <Select disabled={inputType2 === "email" ? true : !editing}>
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
      </div>
      <div className="flex w-full flex-col gap-2">
        <Label>{label_name2}</Label>
        {type[1] === "input" ? (
          <Input type={inputType2} disabled={!editing}></Input>
        ) : (
          <Select disabled={!editing}>
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
      </div>
    </div>
  );
}
