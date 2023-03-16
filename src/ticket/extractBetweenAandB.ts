export const extractBetweenAandB = (
  str: string,
  a: string,
  b: string
): string => {
  const myregex = new RegExp("\\" + a + "(.+)" + b)
  const mathes = str.match(myregex)
  return mathes !== null ? mathes[1] : ""
}
