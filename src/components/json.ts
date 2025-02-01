import { FormJSON } from "../types";

export const json: FormJSON = {
  description: "This is a sample Form Builder",
  completedMessage: "Thank you for your submission!",
  title: "Simple Form Builder",
  elements: [
    {
      type: "text",
      name: "first-name",
      title: "First Name",
      description: "Please type your first name",
      isRequired: true,
      minWidth: "256px",
      maxWidth: "28%",
      value: "",
    },
    {
      type: "text",
      name: "last-name",
      title: "Last Name",
      description: "Please type your last name",
      isRequired: true,
      minWidth: "256px",
      maxWidth: "28%",
      value: "",
    },
    {
      type: "text",
      name: "occupation",
      title: "Occupation",
      description: "Please type your occupation",
      isRequired: false,
      minWidth: "256px",
      maxWidth: "55%",
      value: "",
    },
    {
      type: "checkbox",
      name: "married",
      title: "Married",
      description: "What is your marital status?",
      isRequired: true,
      choices: [
        { text: "Single", value: "single" },
        { text: "Married", value: "married" },
        { text: "Divorced", value: "divorced" },
        { text: "Widowed", value: "widowed" },
      ],
      value: "",
    },
    {
      type: "radio",
      name: "nationality",
      title: "Nationality",
      description: "What is your nationality?",
      isRequired: true,
      choices: [
        { text: "Iranian", value: "iranian" },
        { text: "Other", value: "other" },
      ],
      value: "",
    },
    {
      type: "dropdown",
      name: "gender",
      title: "Gender",
      description: "What is your gender?",
      isRequired: true,
      choices: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
      ],
      value: "",
    },
  ],
  showQuestionNumbers: "off",
  questionTitleLocation: "left",
  questionDescriptionLocation: "underInput",
  questionErrorLocation: "bottom",
  completeText: "REGISTER",
};
