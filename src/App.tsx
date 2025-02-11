import { FolderPlusIcon } from "lucide-react";
import "./App.css";
import SurveyCreator from "./components/form/Creator";
import { Button } from "./components/ui/button";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { Separator } from "./components/ui/separator";
import { SidebarTrigger, useSidebar } from "./components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { useSurveyContext } from "./hooks/useSurveyContext";
import { cn } from "./lib/utils";

const App = () => {
  const { surveyList, addSurvey } = useSurveyContext();
  const { open } = useSidebar();
  const tabClass = open ? "w-[calc(100vw-15rem)]" : "w-[calc(100vw-3rem)]";

  return (
    <Tabs className="w-full p-1">
      <SidebarTrigger />
      <TabsList className={cn("flex justify-start items-center", tabClass)}>
        <Button
          variant="outline"
          size="sm"
          className="rounded-md"
          onClick={addSurvey}
        >
          <FolderPlusIcon />
        </Button>
        <Separator
          className="bg-gray-500 w-[0.1rem] rounded-sm mx-2"
          orientation="vertical"
        />
        <ScrollArea className="w-full whitespace-nowrap rounded-sm">
          <div>
            {surveyList.map((survey) => (
              <TabsTrigger
                autoFocus
                key={survey.id}
                value={survey.id}
                className="hover:bg-gray-700 hover:text-white mx-[0.15rem] capitalize"
              >
                {survey.title}
              </TabsTrigger>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </TabsList>
      {surveyList.map((survey) => (
        <TabsContent key={survey.id} value={survey.id}>
          <SurveyCreator json={survey} />
        </TabsContent>
      ))}
      {surveyList.length === 0 && (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-10rem)]">
          <h1 className="text-2xl font-bold">No surveys found</h1>
          <p className="text-gray-500 flex gap-1">
            Click the <FolderPlusIcon size={20} /> button above to create a new
            survey
          </p>
        </div>
      )}
    </Tabs>
  );
};

export default App;
