import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { PrimeContext } from "./PrimeElement";

type IProps = {
  field: ControllerRenderProps<any, string>;
};

const SelectElement: React.FC<IProps> = ({ field }) => {
  const ctx = React.useContext(PrimeContext);

  if (!ctx) {
    throw new Error("SelectElement must be used within PrimeElement");
  }

  const { element, handleValueChange } = ctx;

  return (
    <FormItem>
      <div className="mb-3">
        <FormLabel>{element.title}</FormLabel>
        <FormDescription>{element.description}</FormDescription>
      </div>
      <Select
        onValueChange={(value) => {
          field.onChange(value);
          handleValueChange(element.name, value);
        }}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select an Item" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {element.options?.map((option) => {
            return (
              <SelectItem
                key={option.value}
                value={option.value}
                className="capitalize"
              >
                {option.text}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};

export default SelectElement;
