import usersJson from "../json/users.json";
export const generateAssigneeNm = (assigneeId: number): string => {
  return (
    usersJson.users.find((x) => {
      return x.id === assigneeId;
    })?.name ?? ""
  );
};
