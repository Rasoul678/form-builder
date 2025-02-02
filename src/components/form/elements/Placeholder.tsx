import { Skeleton } from "@/components/ui/skeleton";
import useScrollToRef from "@/hooks/useScrollToRef";
import React from "react";

const Placeholder = () => {
  const targetRef = React.useRef<HTMLDivElement | null>(null);
  const scrollToTarget = useScrollToRef(targetRef);

  React.useEffect(() => {
    scrollToTarget();

    return () => {
      targetRef.current = null;
    };
  }, []);

  return (
    <div className="my-6 p-4 rounded-lg border border-gray-500 border-dashed">
      <div className="space-y-2" ref={targetRef}>
        <Skeleton className="h-3 w-[30%]" />
        <Skeleton className="h-3 w-[65%]" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  );
};

export default Placeholder;
