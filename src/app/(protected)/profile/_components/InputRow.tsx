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
  data1?: any[];
  data2?: any[];
  editing: boolean;
  value1: any;
  setValue1: (value1: any) => void;
  value2: any;
  setValue2: (value2: any) => void;
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
  value1,
  setValue1,
  value2,
  setValue2,
}: InputRowProps) {
  return (
    <div className="flex flex-row justify-between gap-8">
      <div className="flex w-full flex-col gap-2">
        <Label>{label_name1}</Label>
        {type[0] === "input" ? (
          <Input
            type={inputType1}
            disabled={inputType1 === "email" ? true : !editing}
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            required
          ></Input>
        ) : (
          <Select disabled={!editing} value={value1} onValueChange={setValue1}>
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
          <Input
            type={inputType2}
            disabled={!editing}
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          ></Input>
        ) : (
          <Select disabled={!editing} value={value2} onValueChange={setValue2}>
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
