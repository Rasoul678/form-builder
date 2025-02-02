import "./App.css";
import SurveyCreator from "./components/form/Creator";
import { SurveyProvider } from "./services/SurveyProvider";

const App = () => {
  return (
    <SurveyProvider>
      <SurveyCreator />
    </SurveyProvider>
  );
};

export default App;
