export enum FormTypes {
  TEXT = "text",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  SELECT = "select",
  DATEPICKER = "datepicker",
}

export type OptionType = {
  value: string;
  text: string;
};

export type FormJSON = {
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

export type FormElement = {
  type: FormTypes;
  name: string;
  title: string;
  description: string;
  isRequired: boolean;
  options?: OptionType[];
  value: string | string[];
  defaultValue: string | string[];
};

export type SurveyContextType = {
  json: FormJSON;
  isHover: boolean;
  setIsHover: (isHover: boolean) => void;
  addElement: (newElement: FormElement) => void;
  removeElement: (newElement: FormElement) => void;
};

export type ModalFormData = Pick<
  FormElement,
  "title" | "description" | "isRequired"
> & {
  options: OptionType[];
};
