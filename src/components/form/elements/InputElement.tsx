import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormElement } from "@/types";
import React from "react";
import { UseFormReturn } from "react-hook-form";

type IProps = {
  element: FormElement;
  form: UseFormReturn<any>;
  handleValueChange: (name: string, value: any) => void;
};

const InputElement: React.FC<IProps> = ({
  element,
  form,
  handleValueChange,
}) => {
  return (
    <FormField
      control={form.control}
      name={element.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="my-1">{element.title}</FormLabel>
          <FormControl>
            <Input
              placeholder="e.g. John Doe"
              {...field}
              onChange={(e) => handleValueChange(element.name, e.target.value)}
            />
          </FormControl>
          <FormDescription>{element.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputElement;
