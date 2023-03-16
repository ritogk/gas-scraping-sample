interface TicketSheetInterface {
  print: () => void;
}

export interface ticketInterFace {
  ticketId: number;
  serviceName: string;
  inqueryKind: string;
  description: string;
  publicCommentCount: number;
  privateCommentCount: number;
  commentCount: number;
  status: string;
  createdAt: string;
  createdMonthAt: string;
  updatedAt: string;
  assigneeId: number;
  assigneeNm: string;
  zendeskUrl: string;
}

export class TicketSheet implements TicketSheetInterface {
  private sheet: GoogleAppsScript.Spreadsheet.Sheet | null;
  private tickets: ticketInterFace[];

  private readonly colNo = {
    ticketId: 1,
    serviceName: 2,
    inqueryKind: 3,
    description: 4,
    publicCommentCount: 5,
    privateCommentCount: 6,
    commentCount: 7,
    status: 8,
    createdAt: 9,
    createdMonthAt: 10,
    updatedAt: 11,
    assigneeId: 12,
    assigneeNm: 13,
    zendeskUrl: 14,
  };

  constructor(
    spreadSheetId: string,
    sheetName: string,
    tickets: ticketInterFace[]
  ) {
    this.sheet =
      SpreadsheetApp.openById(spreadSheetId).getSheetByName(sheetName);
    this.tickets = tickets;
  }

  print = () => {
    if (!this.sheet) return;

    // シートの書式をクリア
    this.sheet.clearFormats();
    // ヘッダー
    this.sheet.getRange(1, this.colNo.ticketId).setValue("ticketId");
    this.sheet.getRange(1, this.colNo.serviceName).setValue("サービス名");
    this.sheet.getRange(1, this.colNo.inqueryKind).setValue("問合せ種別");
    this.sheet.getRange(1, this.colNo.description).setValue("内容");
    this.sheet
      .getRange(1, this.colNo.publicCommentCount)
      .setValue("ｺﾒﾝﾄ数(pub)");
    this.sheet
      .getRange(1, this.colNo.privateCommentCount)
      .setValue("ｺﾒﾝﾄ数(pri)");
    this.sheet.getRange(1, this.colNo.commentCount).setValue("ｺﾒﾝﾄ数");
    this.sheet.getRange(1, this.colNo.status).setValue("ステータス");
    this.sheet.getRange(1, this.colNo.createdAt).setValue("問合せ日");
    this.sheet.getRange(1, this.colNo.createdMonthAt).setValue("問合せ月");
    this.sheet.getRange(1, this.colNo.updatedAt).setValue("更新日");
    this.sheet.getRange(1, this.colNo.assigneeId).setValue("担当者id");
    this.sheet.getRange(1, this.colNo.assigneeNm).setValue("担当者名");
    this.sheet.getRange(1, this.colNo.zendeskUrl).setValue("URL");

    // フィルターをかける
    var rule = SpreadsheetApp.newFilterCriteria().whenCellNotEmpty().build();
    if (this.sheet.getFilter() != null) {
      this.sheet.getFilter()?.remove();
    }
    this.sheet.getDataRange().createFilter().setColumnFilterCriteria(1, rule);

    let row = 2;
    // 明細
    this.tickets.forEach((ticket) => {
      if (!this.sheet) return;
      this.sheet.getRange(row, this.colNo.ticketId).setValue(ticket.ticketId);
      this.sheet
        .getRange(row, this.colNo.serviceName)
        .setValue(ticket.serviceName);
      this.sheet
        .getRange(row, this.colNo.inqueryKind)
        .setValue(ticket.inqueryKind);
      this.sheet
        .getRange(row, this.colNo.description)
        .setValue(ticket.description);
      this.sheet
        .getRange(row, this.colNo.publicCommentCount)
        .setValue(ticket.publicCommentCount);
      this.sheet
        .getRange(row, this.colNo.privateCommentCount)
        .setValue(ticket.privateCommentCount);
      this.sheet
        .getRange(row, this.colNo.commentCount)
        .setValue(ticket.commentCount);
      this.sheet.getRange(row, this.colNo.status).setValue(ticket.status);
      this.sheet.getRange(row, this.colNo.createdAt).setValue(ticket.createdAt);
      this.sheet
        .getRange(row, this.colNo.createdMonthAt)
        .setValue(ticket.createdMonthAt);
      this.sheet.getRange(row, this.colNo.updatedAt).setValue(ticket.updatedAt);
      this.sheet
        .getRange(row, this.colNo.assigneeId)
        .setValue(ticket.assigneeId);
      this.sheet
        .getRange(row, this.colNo.assigneeNm)
        .setValue(ticket.assigneeNm);
      this.sheet
        .getRange(row, this.colNo.zendeskUrl)
        .setValue(ticket.zendeskUrl);
      row++;
    });
  };
}
