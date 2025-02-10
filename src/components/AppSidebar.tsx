import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
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

const AppSidebar = () => {
  const context = useSurveyContext();

  const handleDragStart = React.useCallback(
    (type: string) => (e: React.DragEvent<HTMLButtonElement>) => {
      e.dataTransfer.setData("elementType", type);
    },
    []
  );

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[1rem]">
            Form Elements
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {fieldTypes.map((element, index) => (
                <SidebarMenuItem
                  key={index}
                  className="px-2 py-1 w-[10rem] flex justify-start items-center hover:cursor-grab gap-2"
                >
                  <SidebarMenuButton
                    draggable
                    onDragStart={handleDragStart(element.type)}
                    onDragEnd={() => context.setIsHover(false)}
                    asChild
                    className="hover:text-cyan-400"
                  >
                    <a>
                      {element.icon}
                      <span>{element.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
