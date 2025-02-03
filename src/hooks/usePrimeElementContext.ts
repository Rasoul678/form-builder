import { PrimeContext } from "@/components/form/elements/PrimeElement";
import React from "react";

/**
 * Retrieves the current `PrimeContext` from the React context.
 *
 * This hook should be used within a component that is wrapped by the `PrimeContext.Provider`.
 * If the context is not available, it will throw an error.
 *
 * @returns {typeof PrimeContext} The current `PrimeContext` instance.
 */
const usePrimeElementContext = () => {
  const context = React.useContext(PrimeContext);
  if (!context) {
    throw new Error("usePrimeContext must be used within a PrimeContext");
  }
  return context;
};

export default usePrimeElementContext;
