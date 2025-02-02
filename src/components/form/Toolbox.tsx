import { useSurveyContext } from "@/hooks/useSurveyContext";
import { FormTypes } from "@/types";
import {
  CalendarDaysIcon,
  CheckCircle2Icon,
  CheckSquare2,
  FormInputIcon,
  TextSelectionIcon,
} from "lucide-react";
import React from "react";

const fieldTypes = [
  { type: FormTypes.TEXT, label: "Text Input", icon: <FormInputIcon /> },
  { type: FormTypes.SELECT, label: "Dropdown", icon: <TextSelectionIcon /> },
  { type: FormTypes.CHECKBOX, label: "Checkbox", icon: <CheckSquare2 /> },
  { type: FormTypes.RADIO, label: "Radio Button", icon: <CheckCircle2Icon /> },
  {
    type: FormTypes.DATEPICKER,
    label: "Datepicker",
    icon: <CalendarDaysIcon />,
  },
];

const Toolbox = () => {
  const context = useSurveyContext();

  const handleDragStart = React.useCallback(
    (type: string) => (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData("elementType", type);
    },
    []
  );

  return (
    <section className="h-[calc(100vh-3rem)] sticky top-[2rem] w-[20%] ml-2 border border-gray-800 p-4 rounded-lg overflow-hidden">
      <h1 className="mb-4">Toolbox</h1>
      <div className="flex flex-col gap-4 items-center overflow-y-auto h-[calc(100%-5rem)]">
        {fieldTypes.map((element, index) => (
          <div
            key={index}
            className="px-2 py-1 border rounded-sm w-[10rem] flex justify-start items-center hover:cursor-grab hover:text-cyan-400 gap-2"
            draggable
            onDragStart={handleDragStart(element.type)}
            onDragEnd={() => context.setIsHover(false)}
          >
            {element.icon}
            {element.label}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Toolbox;
