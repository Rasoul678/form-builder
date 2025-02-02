import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormElement } from "@/types";
import { UseFormReturn } from "react-hook-form";

type IProps = {
  element: FormElement;
  form: UseFormReturn<any>;
  handleValueChange: (name: string, value: any) => void;
};

const RadioGroupElement: React.FC<IProps> = ({
  element,
  handleValueChange,
  form,
}) => {
  return (
    <FormField
      control={form.control}
      name={element.name}
      render={({ field }) => (
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
      )}
    />
  );
};

export default RadioGroupElement;
