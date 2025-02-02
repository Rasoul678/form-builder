import { RefObject, useCallback } from "react";

/**
 * A React hook that provides a function to smoothly scroll an HTML element into view.
 *
 * @param ref - A React ref object that points to the HTML element to scroll into view.
 * @returns A function that, when called, scrolls the element referenced by the provided ref into view with a smooth animation.
 */
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
