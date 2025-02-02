import { generateFormSchema } from "@/lib/utils";
import { SurveyModel } from "@/services/SurveyModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

/**
 * A React hook that provides a form state and validation for a survey model.
 *
 * @param model - The `SurveyModel` instance containing the survey elements.
 * @returns The form state and methods provided by the `useForm` hook.
 */
export const useSurveyForm = (model: SurveyModel) => {
  const defaultValues = model.elements.reduce((acc, element) => {
    return { ...acc, [element.name]: element.value || element.defaultValue };
  }, {});

  const formSchema = generateFormSchema(model.elements);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return form;
};
