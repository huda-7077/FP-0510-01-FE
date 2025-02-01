const getDaysDifference = (date1: Date, date2: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
};

export const formatDaysRemaining = (endDateISOString: string): string => {
  const endDate = new Date(endDateISOString);
  const currentDate = new Date();

  if (endDate < currentDate) {
    return "Expired";
  }

  const daysDifference = getDaysDifference(endDate, currentDate);

  if (daysDifference === 0) {
    return "Ends today";
  }

  if (daysDifference === 1) {
    return "1 day remaining";
  }

  if (daysDifference < 7) {
    return `${daysDifference} days remaining`;
  }

  if (daysDifference < 30) {
    const weeks = Math.floor(daysDifference / 7);
    return weeks === 1 ? "1 week remaining" : `${weeks} weeks remaining`;
  }

  const months = Math.floor(daysDifference / 30);
  if (months < 12) {
    return months === 1 ? "1 month remaining" : `${months} months remaining`;
  }

  const years = Math.floor(daysDifference / 365);
  return years === 1 ? "1 year remaining" : `${years} years remaining`;
};
