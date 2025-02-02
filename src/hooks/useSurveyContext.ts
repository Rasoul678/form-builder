import { SurveyContext } from "@/services/SurveyProvider";
import React from "react";

/**
 * Retrieves the current SurveyContext from the React context.
 *
 * This hook should be used within a SurveyProvider component to access the survey-related data and functionality.
 *
 * @returns {typeof SurveyContext} The current SurveyContext instance.
 * @throws {Error} If the hook is used outside of a SurveyProvider.
 */
export const useSurveyContext = () => {
  const context = React.useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurveyContext must be used within a SurveyProvider");
  }
  return context;
};
