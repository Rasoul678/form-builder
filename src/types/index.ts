export enum FormTypes {
  TEXT = "text",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  SELECT = "select",
  DATEPICKER = "datepicker",
  SWITCH = "switch",
  SLIDER = "Slider",
}

export type OptionType = {
  value: string;
  text: string;
};

export type FormJSON = {
  id: string;
  description: string;
  completedMessage: string;
  title: string;
  elements: FormElement[];
  showQuestionNumbers: boolean;
  questionTitleLocation: string;
  questionDescriptionLocation: string;
  questionErrorLocation: string;
  completeText: string;
};

type FormValueType = string | string[] | number[] | boolean;
export type FormElement = {
  type: FormTypes;
  name: string;
  title: string;
  description: string;
  isRequired: boolean;
  options?: OptionType[];
  value: FormValueType;
  defaultValue: FormValueType;
};

export type SurveyContextType = {
  surveyList: FormJSON[];
  isHover: boolean;
  setIsHover: (isHover: boolean) => void;
  addSurvey: VoidFunction;
  removeSurvey: (formID: string) => void;
  addElementToSurvey: (newElement: FormElement, formID: string) => void;
  removeElementFromSurvey: (newElement: FormElement, formID: string) => void;
  setSurveyTitle: (title: string, formID: string) => void;
};

export type ModalFormData = Pick<
  FormElement,
  "title" | "description" | "isRequired"
> & {
  options: OptionType[];
};
