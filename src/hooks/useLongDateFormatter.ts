import { useCallback } from "react";

const useLongDateFormatter = () => {
  // We can memoize the formatter function to prevent unnecessary re-renders
  const formatLongDate = useCallback((date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []); // Empty dependency array since formatting options don't change

  return { formatLongDate };
};

export default useLongDateFormatter;
