import { FormElement, FormJSON, SurveyContextType } from "@/types";
import React from "react";

const SurveyContext = React.createContext<SurveyContextType | undefined>(
  undefined
);

const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [surveyList, setSurveyList] = React.useState<FormJSON[]>([]);
  const [isHover, setIsHover] = React.useState(false);

  const addSurvey = () => {
    const newForm: FormJSON = {
      id: `Form-${Date.now()}`,
      description: "This is a sample Form Builder",
      completedMessage: "Thank you for your submission!",
      title: "Simple Form Builder",
      elements: [],
      showQuestionNumbers: true,
      questionTitleLocation: "left",
      questionDescriptionLocation: "underInput",
      questionErrorLocation: "bottom",
      completeText: "SUBMIT",
    };
    setSurveyList((prevFormList) => [...prevFormList, newForm]);
  };

  const removeSurvey = (formID: string) => {
    setSurveyList((prevFormList) =>
      prevFormList.filter((prevForm) => prevForm.id !== formID)
    );
  };

  const addElementToSurvey = (newElement: FormElement, formID: string) => {
    setSurveyList((prevFormList) => {
      const updatedForm = prevFormList.map((prevForm) => {
        if (prevForm.id === formID) {
          return {
            ...prevForm,
            elements: [...prevForm.elements, newElement],
          };
        }
        return prevForm;
      });
      return updatedForm;
    });
  };

  const removeElementFromSurvey = (newElement: FormElement, formID: string) => {
    setSurveyList((prevFormList) => {
      const updatedForm = prevFormList.map((prevForm) => {
        if (prevForm.id === formID) {
          return {
            ...prevForm,
            elements: prevForm.elements.filter(
              (element) => element.name !== newElement.name
            ),
          };
        }
        return prevForm;
      });
      return updatedForm;
    });
  };

  return (
    <SurveyContext.Provider
      value={{
        surveyList,
        isHover,
        setIsHover,
        addSurvey,
        removeSurvey,
        addElementToSurvey,
        removeElementFromSurvey,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export { SurveyContext, SurveyProvider };
