import { useSurveyForm } from "@/hooks/useSurveyForm";
import React from "react";
import { SurveyModel } from "../../services/SurveyModel";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import CheckboxElement from "./elements/CheckboxElement";
import InputElement from "./elements/InputElement";
import RadioGroupElement from "./elements/RadioGroupElement";
import SelectElement from "./elements/SelectElement";

type IProps = {
  model: SurveyModel;
};

const FormRenderer: React.FC<IProps> = ({ model }) => {
  const form = useSurveyForm(model);

  const handleValueChange = (questionName: string, value: any) => {
    model.setValue(questionName, value);
  };

  const onSubmit = () => {
    model.complete();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h1>{model.title}</h1>
        {model.elements.map((element) => (
          <div key={element.name} className="my-6">
            {element.type === "text" && (
              <InputElement
                element={element}
                form={form}
                handleValueChange={handleValueChange}
              />
            )}
            {element.type === "radio" && (
              <RadioGroupElement
                element={element}
                form={form}
                handleValueChange={handleValueChange}
              />
            )}
            {element.type === "checkbox" && (
              <CheckboxElement
                model={model}
                element={element}
                form={form}
                handleValueChange={handleValueChange}
              />
            )}
            {element.type === "select" && (
              <SelectElement
                element={element}
                form={form}
                handleValueChange={handleValueChange}
              />
            )}
          </div>
        ))}
        <Button type="submit">{model.data?.completeText}</Button>
      </form>
    </Form>
  );
};

export default FormRenderer;
