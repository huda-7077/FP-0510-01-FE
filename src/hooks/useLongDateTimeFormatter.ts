import { useCallback } from "react";

const useLongDateTimeFormatter = () => {
  const formatLongDateTime = useCallback((date: Date) => {
    // Create a new Date object and adjust it to WIB (UTC+7)
    const wibDate = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
    );

    return wibDate.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Use 24-hour format
    });
  }, []);

  return { formatLongDateTime };
};

export default useLongDateTimeFormatter;
