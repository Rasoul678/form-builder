import { useSurveyContext } from "@/hooks/useSurveyContext";
import { useSurveyForm } from "@/hooks/useSurveyForm";
import { FormElement, FormTypes } from "@/types";
import React from "react";
import { SurveyModel } from "../../services/SurveyModel";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import CheckboxElement from "./elements/CheckboxElement";
import InputElement from "./elements/InputElement";
import Placeholder from "./elements/Placeholder";
import RadioGroupElement from "./elements/RadioGroupElement";
import SelectElement from "./elements/SelectElement";

type IProps = {
  model: SurveyModel;
};

const FormRenderer: React.FC<IProps> = ({ model }) => {
  const context = useSurveyContext();
  const form = useSurveyForm(model);

  const handleValueChange = (questionName: string, value: any) => {
    model.setValue(questionName, value);
  };

  const onSubmit = () => {
    model.complete();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("elementType") as FormTypes;
    const newElement: FormElement = {
      type,
      name: "fieldName" + Date.now(),
      title: "Field Name",
      description: "Please edit your field name",
      isRequired: true,
      value: "",
      defaultValue: "",
    };

    if (
      type === FormTypes.CHECKBOX ||
      type === FormTypes.RADIO ||
      type === FormTypes.SELECT
    ) {
      newElement.options = [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ];
    }

    if (type === FormTypes.CHECKBOX) {
      newElement.value = [];
      newElement.defaultValue = [];
    }

    context.addElement(newElement);
    context.setIsHover(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    context.setIsHover(true);
  };

  return (
    <div
      className="space-y-6 flex-1 border border-gray-800 py-4 px-12 rounded-lg"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="text-center">{model.title}</h1>
          {!context.isHover && model.elements.length == 0 && (
            <div className="h-[20rem] flex justify-center items-center">
              Drag & Drop here to create an awesome form!
            </div>
          )}
          {model.elements.map((element) => (
            <div
              key={element.name}
              className="my-6 p-4 rounded-lg border border-gray-700"
            >
              {element.type === FormTypes.TEXT && (
                <InputElement
                  element={element}
                  form={form}
                  handleValueChange={handleValueChange}
                />
              )}
              {element.type === FormTypes.RADIO && (
                <RadioGroupElement
                  element={element}
                  form={form}
                  handleValueChange={handleValueChange}
                />
              )}
              {element.type === FormTypes.CHECKBOX && (
                <CheckboxElement
                  model={model}
                  element={element}
                  form={form}
                  handleValueChange={handleValueChange}
                />
              )}
              {element.type === FormTypes.SELECT && (
                <SelectElement
                  element={element}
                  form={form}
                  handleValueChange={handleValueChange}
                />
              )}
            </div>
          ))}
          {context.isHover && <Placeholder />}
          {model.elements.length > 0 && (
            <Button type="submit">{model.data?.completeText}</Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default FormRenderer;
