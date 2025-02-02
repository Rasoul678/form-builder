import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { PrimeContext } from "./PrimeElement";

type IProps = {
  field: ControllerRenderProps<any, string>;
};

const CheckboxElement: React.FC<IProps> = () => {
  const ctx = React.useContext(PrimeContext);

  if (!ctx) {
    throw new Error("CheckboxElement must be used within PrimeElement");
  }

  const { element, form, handleValueChange, model } = ctx;

  return (
    <FormItem>
      <div className="mb-4">
        <FormLabel className="text-base">{element.title}</FormLabel>
        <FormDescription>{element.description}</FormDescription>
      </div>
      {element.options?.map((option) => (
        <FormField
          key={option.value}
          control={form.control}
          name={element.name}
          render={({ field }) => {
            const values = model.getValue(element.name) || [];

            return (
              <FormItem
                key={option.value}
                className="flex flex-row items-start space-x-3 space-y-0"
              >
                <FormControl>
                  <Checkbox
                    checked={element.value?.includes(option.value)}
                    onCheckedChange={(checked) => {
                      if (values.includes(option.value)) {
                        values.splice(values.indexOf(option.value), 1);
                      } else {
                        values.push(option.value);
                      }
                      handleValueChange(element.name, values);

                      return checked
                        ? field.onChange([...element.value, option.value])
                        : field.onChange(
                            (element.value as string[])?.filter(
                              (value: string) => value !== option.value
                            )
                          );
                    }}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal capitalize">
                  {option.text}
                </FormLabel>
              </FormItem>
            );
          }}
        />
      ))}
      <FormMessage />
    </FormItem>
  );
};

export default CheckboxElement;
