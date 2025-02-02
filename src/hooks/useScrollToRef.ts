import { RefObject, useCallback } from "react";

const useScrollToRef = (ref: RefObject<HTMLElement>) => {
  const scrollToRef = useCallback(
    (
      options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" }
    ) => {
      if (ref && ref.current) {
        ref.current.scrollIntoView(options);
      }
    },
    [ref]
  );

  return scrollToRef;
};

export default useScrollToRef;
