import { FolderPlusIcon } from "lucide-react";
import React from "react";
import "./App.css";
import SurveyCreator from "./components/form/Creator";
import AppLayout from "./components/layout/AppLayout";
import { Button } from "./components/ui/button";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { Separator } from "./components/ui/separator";
import { SidebarTrigger } from "./components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

const App = () => {
  const [surveyList, setSurveyList] = React.useState<string[]>([]);

  return (
    <AppLayout>
      <Tabs className="w-full p-1">
        <SidebarTrigger />
        <TabsList className="flex justify-start items-center">
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg"
            onClick={() =>
              setSurveyList((survey) => [...survey, `Form-${Date.now()}`])
            }
          >
            <FolderPlusIcon />
          </Button>
          <Separator
            className="bg-gray-500 w-[0.1rem] rounded-sm mx-2"
            orientation="vertical"
          />
          <ScrollArea className="w-full whitespace-nowrap rounded-sm">
            <div>
              {surveyList.map((id) => (
                <TabsTrigger
                  autoFocus
                  key={id}
                  value={id}
                  className="hover:bg-gray-700 hover:text-white mx-[0.15rem]"
                >
                  {id}
                </TabsTrigger>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </TabsList>
        {surveyList.map((id) => (
          <TabsContent key={id} value={id}>
            <SurveyCreator />
          </TabsContent>
        ))}
      </Tabs>
    </AppLayout>
  );
};

export default App;
