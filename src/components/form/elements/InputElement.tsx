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
      <FormLabel className="my-1 capitalize">{element.title}</FormLabel>
      <FormControl>
        <Input
          placeholder="e.g: John Doe"
          onChange={(e) => {
            field.onChange(e.target.value);
            handleValueChange(element.name, e.target.value);
          }}
        />
      </FormControl>
      <FormDescription className="capitalize">
        {element.description}
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default InputElement;
