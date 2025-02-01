import React from "react";
import { SurveyModel as Model } from "../../services/SurveyModel";
import { json } from "../json";
import SurveyRenderer from "./Renderer";

type IProps = {};

const SurveyCreator: React.FC<IProps> = () => {
  const survey = new Model(json);

  survey.onComplete.add((sender) => {
    console.log(JSON.stringify(sender.data, null, 3));
  });

  survey.onValueChanged.add((_sender, args) => {
    console.log(args);
  });
  // TODO: add dnd and draggable elements

  return (
    <div>
      <SurveyRenderer model={survey} />
    </div>
  );
};

export default SurveyCreator;
