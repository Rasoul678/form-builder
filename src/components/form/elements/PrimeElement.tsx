import { FormField } from "@/components/ui/form";
import { useSurveyContext } from "@/hooks/useSurveyContext";
import { isFragment } from "@/lib/utils";
import { SurveyModel } from "@/services/SurveyModel";
import { FormElement, FormTypes } from "@/types";
import React, { Suspense } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import Placeholder from "./Placeholder";

const CheckboxElement = React.lazy(() => import("./CheckboxElement"));
const InputElement = React.lazy(() => import("./InputElement"));
const RadioGroupElement = React.lazy(() => import("./RadioGroupElement"));
const SelectElement = React.lazy(() => import("./SelectElement"));

type IProps = {
  element: FormElement;
  form: UseFormReturn<any>;
  model: SurveyModel;
  handleValueChange: (name: string, value: any) => void;
};

export const PrimeContext = React.createContext<IProps | undefined>(undefined);

const PrimeElement: React.FC<IProps> = (props) => {
  const { element, form } = props;
  const context = useSurveyContext();

  const fragmentRef = React.useRef(false);

  //! First check if an element is a fragment(means: NOT implemented yet!).
  //! Then remove the element from the list of elements.
  React.useLayoutEffect(() => {
    if (fragmentRef.current) {
      context.removeElement(element);
      console.error(element.type + " is not implemented yet!");
    }
  }, [fragmentRef.current]);

  const renderField = (field: ControllerRenderProps<any, string>) => {
    switch (props.element.type) {
      case FormTypes.TEXT:
        return <InputElement field={field} />;
      case FormTypes.CHECKBOX:
        return <CheckboxElement field={field} />;
      case FormTypes.RADIO:
        return <RadioGroupElement field={field} />;
      case FormTypes.SELECT:
        return <SelectElement field={field} />;
      default:
        return <></>;
    }
  };

  return (
    <PrimeContext.Provider value={props}>
      <div className="my-6 p-4 rounded-lg border border-gray-700">
        <FormField
          control={form.control}
          name={element.name}
          render={({ field }) => {
            const isFragmentElement = isFragment(renderField(field));
            fragmentRef.current = isFragmentElement;

            return (
              <Suspense key={element.name} fallback={<Placeholder />}>
                {renderField(field)}
              </Suspense>
            );
          }}
        />
      </div>
    </PrimeContext.Provider>
  );
};

export default PrimeElement;
