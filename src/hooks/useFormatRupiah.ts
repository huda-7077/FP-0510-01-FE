import { useMemo } from "react";

const useFormatRupiah = (amount: number | null | undefined): string => {
  return useMemo(() => {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return "Rp0"; // Handle invalid or missing values
    }

    return `Rp${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }, [amount]);
};

export default useFormatRupiah;
