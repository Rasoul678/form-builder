import { SurveyProvider } from "@/services/SurveyProvider";
import AppSidebar from "../AppSidebar";
import { SidebarProvider } from "../ui/sidebar";

type IPorps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<IPorps> = ({ children }) => {
  return (
    <SurveyProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full min-h-screen m-2">{children}</main>
      </SidebarProvider>
    </SurveyProvider>
  );
};

export default AppLayout;
