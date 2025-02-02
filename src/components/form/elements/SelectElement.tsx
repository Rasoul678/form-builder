import {
  FormControl,
  FormDescription,
  FormField,
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
import { FormElement } from "@/types";
import React from "react";
import { UseFormReturn } from "react-hook-form";

type IProps = {
  element: FormElement;
  form: UseFormReturn<any>;
  handleValueChange: (name: string, value: any) => void;
};

const SelectElement: React.FC<IProps> = ({
  element,
  form,
  handleValueChange,
}) => {
  return (
    <FormField
      control={form.control}
      name={element.name}
      render={({ field }) => {
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
      }}
    />
  );
};

export default SelectElement;
