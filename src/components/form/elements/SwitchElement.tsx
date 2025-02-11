import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import usePrimeElementContext from "@/hooks/usePrimeElementContext";
import { ControllerRenderProps } from "react-hook-form";

type IProps = {
  field: ControllerRenderProps<any, string>;
};

const SwitchElement: React.FC<IProps> = ({ field }) => {
  const { element, handleValueChange } = usePrimeElementContext();

  return (
    <FormItem className="flex flex-row items-center justify-between">
      <div className="space-y-0.5 capitalize">
        <FormLabel>{element.title}</FormLabel>
        <FormDescription>{element.description}</FormDescription>
      </div>
      <FormControl>
        <Switch
          checked={field.value}
          defaultChecked={element.defaultValue as boolean}
          onCheckedChange={(checked) => {
            field.onChange(checked);
            handleValueChange(element.name, checked);
          }}
        />
      </FormControl>
    </FormItem>
  );
};

export default SwitchElement;
