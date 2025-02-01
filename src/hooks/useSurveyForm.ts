import { generateFormSchema } from "@/lib/utils";
import { SurveyModel } from "@/services/SurveyModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
