import { useSurveyContext } from "@/hooks/useSurveyContext";
import React from "react";
import { SurveyModel as Model } from "../../services/SurveyModel";
import SurveyRenderer from "./Renderer";
import Toolbox from "./Toolbox";

type IProps = {};

const SurveyCreator: React.FC<IProps> = () => {
  const { json } = useSurveyContext();

  const surveyModel = new Model(json);

  surveyModel.onComplete.add((sender) => {
    console.log(JSON.stringify(sender.data, null, 3));
  });

  surveyModel.onValueChanged.add((_sender, args) => {
    console.log(args);
  });

  return (
    <main className="flex p-8 min-h-screen">
      <SurveyRenderer model={surveyModel} />
      <Toolbox />
    </main>
  );
};

export default SurveyCreator;
