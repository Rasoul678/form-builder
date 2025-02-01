export type FormJSON = {
  description: string;
  completedMessage: string;
  title: string;
  elements: FormElement[];
  showQuestionNumbers: string;
  questionTitleLocation: string;
  questionDescriptionLocation: string;
  questionErrorLocation: string;
  completeText: string;
};

export type FormElement = {
  type: string;
  name: string;
  title: string;
  description: string;
  isRequired: boolean;
  minWidth?: string;
  maxWidth?: string;
  options?: { value: string; text: string }[];
  value: string | string[];
  defaultValue: string | string[];
};
