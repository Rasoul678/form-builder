import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { PrimeContext } from "./PrimeElement";

type IProps = {
  field: ControllerRenderProps<any, string>;
};

const InputElement: React.FC<IProps> = ({ field }) => {
  const ctx = React.useContext(PrimeContext);

  if (!ctx) {
    throw new Error("InputElement must be used within PrimeElement");
  }

  const { element, handleValueChange } = ctx;

  return (
    <FormItem>
      <FormLabel className="my-1">{element.title}</FormLabel>
      <FormControl>
        <Input
          placeholder="e.g: John Doe"
          onChange={(e) => {
            field.onChange(e.target.value);
            handleValueChange(element.name, e.target.value);
          }}
        />
      </FormControl>
      <FormDescription>{element.description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default InputElement;
