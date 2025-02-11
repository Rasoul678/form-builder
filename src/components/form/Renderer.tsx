import { useSurveyContext } from "@/hooks/useSurveyContext";
import { useSurveyForm } from "@/hooks/useSurveyForm";
import { FormElement, FormTypes, ModalFormData } from "@/types";
import React from "react";
import { SurveyModel } from "../../services/SurveyModel";
import InlineInputEdit from "../InlineInputEdit";
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
    const { description, isRequired, title, options } = data;

    const isMultiOption =
      type === FormTypes.CHECKBOX ||
      type === FormTypes.RADIO ||
      type === FormTypes.SELECT;

    const newElement: FormElement = {
      type,
      name: type + "@" + Date.now(),
      title: title || `${type} Field Name`,
      description: description || `${type} Field Description`,
      isRequired,
      value: "",
      defaultValue: "",
    };

    if (isMultiOption) {
      newElement.options = options;
    }

    if (type === FormTypes.CHECKBOX) {
      newElement.value = [];
      newElement.defaultValue = [];
    }

    context.addElementToSurvey(newElement, model.data?.id || "");
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
      className="space-y-6 flex-1 min-h-[calc(100vh-6rem)] py-4 px-12"
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
          <InlineInputEdit
            inputValue={model.title}
            onSave={(value) =>
              context.setSurveyTitle(value, model.data?.id || "")
            }
          />
          {!context.isHover && model.elements.length == 0 && (
            <div className="h-[20rem] flex justify-center items-center">
              Drag & Drop here to create an awesome form!
            </div>
          )}
          {model.elements.map((element, idx) => (
            <PrimeElement
              key={element.name}
              index={idx + 1}
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
