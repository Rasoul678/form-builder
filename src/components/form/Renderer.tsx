import { useSurveyContext } from "@/hooks/useSurveyContext";
import { useSurveyForm } from "@/hooks/useSurveyForm";
import { FormElement, FormTypes, ModalFormData } from "@/types";
import React from "react";
import { SurveyModel } from "../../services/SurveyModel";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import Placeholder from "./elements/Placeholder";
import PreCreationModal from "./elements/PreCreationModal";
import PrimeElement from "./elements/PrimeElement";

// TODO: Add inline fields editing

type IProps = {
  model: SurveyModel;
};

const FormRenderer: React.FC<IProps> = ({ model }) => {
  const context = useSurveyContext();
  const form = useSurveyForm(model);
  const [isOpen, setIsopen] = React.useState(false);
  const [type, setType] = React.useState<FormTypes | null>(null);

  const handleValueChange = (questionName: string, value: any) => {
    model.setValue(questionName, value);
  };

  const onSubmit = () => {
    model.complete();
  };

  const createElement = (data: ModalFormData) => {
    if (!type) return;

    const isMultiOption =
      type === FormTypes.CHECKBOX ||
      type === FormTypes.RADIO ||
      type === FormTypes.SELECT;

    const newElement: FormElement = {
      type,
      name: "fieldName" + Date.now(),
      title: data.title || "Field Name",
      description: data.description || "Field Description",
      isRequired: true,
      value: "",
      defaultValue: "",
    };

    if (isMultiOption) {
      newElement.options = data.options;
    }

    if (type === FormTypes.CHECKBOX) {
      newElement.value = [];
      newElement.defaultValue = [];
    }

    context.addElement(newElement);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("elementType") as FormTypes;
    setType(type);

    context.setIsHover(false);
    setIsopen(true);
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
      {isOpen && (
        <PreCreationModal
          onSubmit={(formData) => createElement(formData)}
          onClose={() => setIsopen(false)}
          type={type}
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="text-center">{model.title}</h1>
          {!context.isHover && model.elements.length == 0 && (
            <div className="h-[20rem] flex justify-center items-center">
              Drag & Drop here to create an awesome form!
            </div>
          )}
          {model.elements.map((element) => (
            <PrimeElement
              key={element.name}
              element={element}
              form={form}
              model={model}
              handleValueChange={handleValueChange}
            />
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
