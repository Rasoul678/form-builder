import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Placeholder = () => {
  const targetRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  React.useEffect(() => {
    scrollToTarget();

    return () => {
      targetRef.current = null;
    };
  }, []);

  return (
    <div className="space-y-2" ref={targetRef}>
      <Skeleton className="h-3 w-[30%]" />
      <Skeleton className="h-3 w-[65%]" />
      <Skeleton className="h-4 w-[80%]" />
    </div>
  );
};

export default Placeholder;
