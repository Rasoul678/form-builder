import { FormElement } from "@/types";
import { clsx, type ClassValue } from "clsx";
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
      case "text":
        schema = z.string().min(2, {
          message: "Input must be at least 2 characters.",
        });
        break;
      case "radio":
        schema = z.string({
          required_error: "Please select an item to display.",
        });
        break;
      case "checkbox":
        schema = z
          .array(z.string())
          .refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
          });
        break;
      case "select":
        schema = z.string({
          required_error: "Please select an item to display.",
        });
        break;
    }
    return { ...acc, [element.name]: schema };
  }, {});

  return z.object(schemaObject);
}
