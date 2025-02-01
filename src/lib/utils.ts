import { FormElement } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
