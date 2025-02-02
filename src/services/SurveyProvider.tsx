import { FormElement, FormJSON, SurveyContextType } from "@/types";
import React from "react";

const SurveyContext = React.createContext<SurveyContextType | undefined>(
  undefined
);

const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formConfig, setFormConfig] = React.useState<FormJSON>({
    description: "This is a sample Form Builder",
    completedMessage: "Thank you for your submission!",
    title: "Simple Form Builder",
    elements: [],
    showQuestionNumbers: "off",
    questionTitleLocation: "left",
    questionDescriptionLocation: "underInput",
    questionErrorLocation: "bottom",
    completeText: "SUBMIT",
  });

  const [isHover, setIsHover] = React.useState(false);

  const addElement = (newElement: FormElement) => {
    setFormConfig((prevConfig) => ({
      ...prevConfig,
      elements: [...prevConfig.elements, newElement],
    }));
  };

  return (
    <SurveyContext.Provider
      value={{ json: formConfig, isHover, setIsHover, addElement }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export { SurveyContext, SurveyProvider };
