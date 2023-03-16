import { ticketInterFace } from "../spreadSheet/ticketSheet";
import { fetchZendesk } from "../core/fetch";
import { generateServiceName } from "./generateServiceName";
import { generateInqueryKind } from "./generateInqueryKind";
import { generateCreatedAt } from "./generateCreatedAt";
import { generateCreatedMonthAt } from "./generateCreatedMonthAt";
import { generateUpdatedAt } from "./generateUpdatedAt";
import { generateAssigneeNm } from "./generateAssigneeNm";
import { generateZendeskUrl } from "./generateZendeskUrl";
import { generatePublicCommentCount } from "./generatePublicCommentCount";
import { generatePrivateCommentCount } from "./generatePrivateCommentCount";

export const makeTicketData = (
  email: string,
  token: string
): ticketInterFace[] => {
  const tickets: ticketInterFace[] = [];

  let ticketUrl = "https://quartetcom.zendesk.com/api/v2/tickets";
  while (true) {
    if (ticketUrl === null) break;

    const response = fetchZendesk(ticketUrl, email, token);
    const ticketsJson = JSON.parse(response.getContentText("UTF-8"));
    ticketUrl = ticketsJson.next_page;

    // 加工する
    ticketsJson.tickets.forEach((ticket: any) => {
      const subject = ticket.subject;
      const serviceName = generateServiceName(subject);
      const inqueryKind = generateInqueryKind(subject);
      const description = ticket.description;
      const ticketId = ticket.id;
      const status = ticket.status;
      const dateCreatedAt = new Date(ticket.created_at);
      const createdAt = generateCreatedAt(dateCreatedAt);
      const createdMonthAt = generateCreatedMonthAt(dateCreatedAt);
      const updatedAt = generateUpdatedAt(new Date(ticket.updated_at));
      const assigneeId = ticket.assignee_id;
      const assigneeNm = generateAssigneeNm(assigneeId);
      const zendeskUrl = generateZendeskUrl(ticketId);

      // チケットのコメント情報を取ってくる
      const response = fetchZendesk(
        "https://quartetcom.zendesk.com/api/v2/tickets/" +
          ticketId +
          "/comments",
        email,
        token
      );
      const comments: any[] = JSON.parse(
        response.getContentText("UTF-8")
      ).comments;

      const publicCommentCount = generatePublicCommentCount(comments);
      const privateCommentCount = generatePrivateCommentCount(comments);
      const commentCount = comments.length;

      tickets.push({
        ticketId: ticketId,
        serviceName: serviceName,
        inqueryKind: inqueryKind,
        description: description,
        publicCommentCount: publicCommentCount,
        privateCommentCount: privateCommentCount,
        commentCount: commentCount,
        status: status,
        createdAt: createdAt,
        createdMonthAt: createdMonthAt,
        updatedAt: updatedAt,
        assigneeId: assigneeId,
        assigneeNm: assigneeNm,
        zendeskUrl: zendeskUrl,
      });
    });
  }

  return tickets;
};
