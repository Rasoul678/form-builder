import { FormElement, FormTypes } from "@/types";
import { clsx, type ClassValue } from "clsx";
import React, { ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

/**
 * Merges CSS class names using the `clsx` and `tailwind-merge` libraries.
 *
 * @param inputs - An array of CSS class names to be merged.
 * @returns The merged CSS class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a Zod schema object based on an array of form elements.
 *
 * @param elements - An array of `FormElement` objects representing the form fields.
 * @returns A Zod schema object that can be used to validate the form data.
 */
export function generateFormSchema(elements: FormElement[]) {
  const schemaObject = elements.reduce((acc, element) => {
    let schema: any;

    switch (element.type) {
      case FormTypes.TEXT:
        if (element.isRequired) {
          schema = z
            .string({
              required_error: "Please enter a value.",
            })
            .min(2, {
              message: "Input must be at least 2 characters.",
            });
        } else {
          schema = z.string().optional();
        }

        break;
      case FormTypes.RADIO:
        if (element.isRequired) {
          schema = z.string({
            required_error: "Please select an item to display.",
          });
        } else {
          schema = z.string().optional();
        }
        break;
      case FormTypes.CHECKBOX:
        if (element.isRequired) {
          schema = z
            .array(z.string())
            .refine((value) => value.some((item) => item), {
              message: "You have to select at least one item.",
            });
        } else {
          schema = z.array(z.string()).optional();
        }
        break;
      case FormTypes.SELECT:
        if (element.isRequired) {
          schema = z.string({
            required_error: "Please select an item to display.",
          });
        } else {
          schema = z.string().optional();
        }
        break;
      case FormTypes.DATEPICKER:
        if (element.isRequired) {
          schema = z.date({
            required_error: "A date is required.",
          });
        } else {
          schema = z.date().optional();
        }
        break;
    }
    return { ...acc, [element.name]: schema };
  }, {});

  return z.object(schemaObject);
}

/**
 * Checks if the provided React element is a Fragment.
 *
 * @param element - The React element to check.
 * @returns `true` if the element is a Fragment, `false` otherwise.
 */
export const isFragment = (element: ReactElement): boolean => {
  return (
    React.isValidElement(element) &&
    (element.type === React.Fragment ||
      element.type.toString() === "Symbol(react.fragment)")
  );
};
