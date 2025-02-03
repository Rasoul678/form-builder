import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import usePrimeElementContext from "@/hooks/usePrimeElementContext";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDaysIcon, CalendarIcon } from "lucide-react";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

type IProps = {
  field: ControllerRenderProps<any, string>;
};

const CalendarElement: React.FC<IProps> = ({ field }) => {
  const { element, handleValueChange } = usePrimeElementContext();

  return (
    <FormItem className="flex flex-col">
      <FormLabel className="my-[0.3rem] capitalize">{element.title}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              {field.value ? (
                <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-80" />
              ) : (
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              )}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={element.value as any}
            onSelect={(value) => {
              field.onChange(value);
              handleValueChange(element.name, value);
            }}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormDescription className="capitalize">
        {element.description}
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default CalendarElement;
