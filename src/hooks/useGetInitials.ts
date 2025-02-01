const useGetInitials = () => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return { getInitials };
};

export default useGetInitials;
