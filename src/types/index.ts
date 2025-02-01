export type FormJSON = {
  description: string;
  completedMessage: string;
  title: string;
  elements: Element[];
  showQuestionNumbers: string;
  questionTitleLocation: string;
  questionDescriptionLocation: string;
  questionErrorLocation: string;
  completeText: string;
};

export type Element = {
  type: string;
  name: string;
  title: string;
  description: string;
  isRequired: boolean;
  minWidth?: string;
  maxWidth?: string;
  choices?: { value: string; text: string }[];
  value: string;
};
