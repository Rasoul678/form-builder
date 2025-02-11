import { SurveyProvider } from "@/services/SurveyProvider";
import AppSidebar from "../AppSidebar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

type IPorps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<IPorps> = ({ children }) => {
  return (
    <SurveyProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="min-h-screen m-2">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </SurveyProvider>
  );
};

export default AppLayout;
