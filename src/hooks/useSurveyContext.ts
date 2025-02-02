import { SurveyContext } from "@/services/SurveyProvider";
import React from "react";

export const useSurveyContext = () => {
  const context = React.useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurveyContext must be used within a SurveyProvider");
  }
  return context;
};
