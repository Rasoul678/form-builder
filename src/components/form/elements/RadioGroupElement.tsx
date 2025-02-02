import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { PrimeContext } from "./PrimeElement";

type IProps = {
  field: ControllerRenderProps<any, string>;
};

const RadioGroupElement: React.FC<IProps> = ({ field }) => {
  const ctx = React.useContext(PrimeContext);

  if (!ctx) {
    throw new Error("RadioGroupElement must be used within PrimeElement");
  }

  const { element, handleValueChange } = ctx;

  return (
    <FormItem className="space-y-3">
      <div className="mb-3">
        <FormLabel className="text-base">{element.title}</FormLabel>
        <FormDescription>{element.description}</FormDescription>
      </div>
      <FormControl>
        <RadioGroup
          onValueChange={(value) => {
            field.onChange(value);
            handleValueChange(element.name, value);
          }}
          defaultValue={element.defaultValue as string}
          className="flex flex-col space-y-1"
        >
          {element.options?.map((option) => (
            <FormItem
              key={option.value}
              className="flex items-center space-x-3 space-y-0"
            >
              <FormControl>
                <RadioGroupItem value={option.value} />
              </FormControl>
              <FormLabel className="font-normal capitalize">
                {option.text}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default RadioGroupElement;
