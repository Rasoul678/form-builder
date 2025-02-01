import "./App.css";
import reactLogo from "./assets/react.svg";
import SurveyCreator from "./components/form/Creator";
import viteLogo from "/vite.svg";

const App = () => {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <SurveyCreator />
    </>
  );
};

export default App;
