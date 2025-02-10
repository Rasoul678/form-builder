import { useSurveyContext } from "@/hooks/useSurveyContext";
import React from "react";
import { SurveyModel as Model } from "../../services/SurveyModel";
import SurveyRenderer from "./Renderer";

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

  return <SurveyRenderer model={surveyModel} />;
};

export default SurveyCreator;
