import { makeTicketData } from "./ticket/makeTicketData"
import { TicketSheet } from "./spreadSheet/ticketSheet"
import { env } from "./env"

/**
 * main(GASで実行する関数)
 * @param e
 * @returns
 */
global.main = function (e: any) {
  const tickets = makeTicketData(env.zendesk.email, env.zendesk.token)
  const ticketSheet = new TicketSheet(
    env.spreadSheet.spreadSheetId,
    env.spreadSheet.sheetName,
    tickets
  )
  ticketSheet.print()
}
