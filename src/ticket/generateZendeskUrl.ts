export const generateZendeskUrl = (ticketId: string): string => {
  return "https://quartetcom.zendesk.com/agent/tickets/" + ticketId;
};
