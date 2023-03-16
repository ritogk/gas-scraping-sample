export const generateCreatedMonthAt = (date: Date): string => {
  return `${String(date.getFullYear()).slice(2)}/${date.getMonth() + 1}`;
};
