import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import type { DoctorConnection } from "~/types/connection";

export default function PopoverFilterModal({
  open,
  setOpen,
  value,
  setValue,
  data,
}: {
  open: boolean;
  setOpen: (newValue: boolean) => void;
  value: string;
  setValue: (newValue: string) => void;
  data: DoctorConnection[];
}) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number>();

  React.useEffect(() => {
    if (open && triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? (() => {
                const selected = data.find(
                  (d) =>
                    `${d.patient.patientProfile?.firstName} ${d.patient.patientProfile?.lastName}` ===
                    value,
                );
                return selected
                  ? `${selected.patient.patientProfile?.firstName} ${selected.patient.patientProfile?.lastName}`
                  : "Select a connection...";
              })()
            : "Select a connection..."}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={triggerWidth ? { width: triggerWidth } : {}}
        className="p-0"
      >
        <Command>
          <CommandInput placeholder="Search for a connection..." />
          <CommandList>
            <CommandEmpty>No connections found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.patient.id}
                  value={`${item.patient.patientProfile?.firstName} ${item.patient.patientProfile?.lastName}`}
                  onSelect={(current) => {
                    setValue(current === value ? "" : current);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.patient.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {`${item.patient.patientProfile?.firstName} ${item.patient.patientProfile?.lastName}`}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
