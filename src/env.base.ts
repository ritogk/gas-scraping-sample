import { envInterface } from "./core/envInterface";

const env: envInterface = {
  zendesk: {
    email: "aaaa@example.com",
    token: "123456789012345678901234567890",
  },
  spreadSheet: {
    spreadSheetId: "12345678",
    sheetName: "sheet1",
  },
};

export { env };
