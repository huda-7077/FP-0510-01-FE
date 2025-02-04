import { useMemo } from "react";

const useFormatRupiah = (amount: number): string => {
  return useMemo(() => {
    if (amount === null || amount === undefined) return "Rp0";

    // Convert the number to a string and format it
    return `Rp${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }, [amount]);
};

export default useFormatRupiah;
