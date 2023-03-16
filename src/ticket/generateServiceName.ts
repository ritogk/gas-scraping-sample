import { extractBetweenAandB } from "./extractBetweenAandB";

const mugengaNameList = [
  "無限GAレポート",
  "無限GAレポートメーカー事務局",
  "無限GA",
];
const lisketNameList = ["Lisket事務局"];

export const generateServiceName = (
  subject: string
): "無限GA" | "Lisket" | "?" => {
  const name = extractBetweenAandB(subject, "【", "】");
  if (mugengaNameList.includes(name)) {
    return "無限GA";
  }
  if (lisketNameList.includes(name)) {
    return "Lisket";
  }
  return "?";
};
