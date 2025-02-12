const useFormatTitleCase = () => {
  const formatTitleCase = (str: string) => {
    if (!str) {
      return "";
    }
    return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
  };

  return { formatTitleCase };
};

export default useFormatTitleCase;
