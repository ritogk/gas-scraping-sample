interface envInterface {
  zendesk: {
    email: string
    token: string
  }
  spreadSheet: {
    spreadSheetId: string
    sheetName: string
  }
}

export { envInterface }
