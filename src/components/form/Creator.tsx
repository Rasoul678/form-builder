import { FormJSON } from "@/types";
import React from "react";
import { SurveyModel as Model } from "../../services/SurveyModel";
import Survey from "./Renderer";

type IProps = {
  json: FormJSON;
};

const SurveyCreator: React.FC<IProps> = ({ json }) => {
  const model = new Model(json);

  model.onComplete.add((sender) => {
    console.log(JSON.stringify(sender.data, null, 3));
  });

  model.onValueChanged.add((_sender, args) => {
    console.log(args);
  });

  return <Survey model={model} />;
};

export default SurveyCreator;
