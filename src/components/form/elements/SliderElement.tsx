import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import usePrimeElementContext from "@/hooks/usePrimeElementContext";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

type IProps = {
  field: ControllerRenderProps<any, string>;
};

const SliderElement: React.FC<IProps> = ({ field }) => {
  const { element, handleValueChange } = usePrimeElementContext();

  return (
    <FormItem>
      <div className="mb-4 capitalize">
        <FormLabel className="my-1">{element.title}</FormLabel>
        <FormDescription>{element.description}</FormDescription>
      </div>
      <FormControl>
        <Slider
          defaultValue={(element.defaultValue as number[]) || [0]}
          max={100}
          step={1}
          onValueChange={(value) => {
            field.onChange(value);
            handleValueChange(element.name, value);
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default SliderElement;
