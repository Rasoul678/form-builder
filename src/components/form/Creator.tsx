import { SurveyContext } from "@/services/SurveyProvider";
import React from "react";
import { SurveyModel as Model } from "../../services/SurveyModel";
import Toolbox from "../Toolbox";
import SurveyRenderer from "./Renderer";

type IProps = {};

const SurveyCreator: React.FC<IProps> = () => {
  const context = React.useContext(SurveyContext);

  if (!context) {
    throw new Error("SurveyCreator must be used within a SurveyProvider");
  }

  const survey = new Model(context.json);

  survey.onComplete.add((sender) => {
    console.log(JSON.stringify(sender.data, null, 3));
  });

  survey.onValueChanged.add((_sender, args) => {
    console.log(args);
  });

  return (
    <div className="flex p-8 min-h-screen">
      <SurveyRenderer model={survey} />
      <Toolbox />
    </div>
  );
};

export default SurveyCreator;
