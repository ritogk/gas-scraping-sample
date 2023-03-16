export const generatePublicCommentCount = (comments: any[]): number => {
  return comments.filter((x: any) => {
    return x.public;
  }).length;
};
