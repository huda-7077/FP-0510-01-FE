import { format, parseISO } from "date-fns";
import { useCallback } from "react";

const useFormatDateForDateTimeLocal = () => {
  const formatDateForDateTimeLocal = useCallback(
    (date: string | Date): string => {
      const parsedDate = typeof date === "string" ? parseISO(date) : date;
      return format(parsedDate, "yyyy-MM-dd'T'HH:mm");
    },
    [],
  );

  return { formatDateForDateTimeLocal };
};

export default useFormatDateForDateTimeLocal;
