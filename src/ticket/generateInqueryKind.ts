import { extractBetweenAandB } from "./extractBetweenAandB";

export const generateInqueryKind = (subject: string): string => {
  return extractBetweenAandB(subject, "「", "」");
};
