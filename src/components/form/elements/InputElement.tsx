import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import usePrimeElementContext from "@/hooks/usePrimeElementContext";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

type IProps = {
  field: ControllerRenderProps<any, string>;
};

const InputElement: React.FC<IProps> = ({ field }) => {
  const { element, handleValueChange } = usePrimeElementContext();

  return (
    <FormItem>
      <div className="mb-4 capitalize">
        <FormLabel className="my-1">{element.title}</FormLabel>
        <FormDescription>{element.description}</FormDescription>
      </div>
      <FormControl>
        <Input
          placeholder="e.g: John Doe"
          onChange={(e) => {
            field.onChange(e.target.value);
            handleValueChange(element.name, e.target.value);
          }}
        />
      </FormControl>

      <FormMessage />
    </FormItem>
  );
};

export default InputElement;
