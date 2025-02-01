import { useCallback } from "react";

const useLongDateFormatter = () => {
  const formatLongDate = useCallback((date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  return { formatLongDate };
};

export default useLongDateFormatter;
