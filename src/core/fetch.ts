export const fetchZendesk = (
  url: string,
  email: string,
  token: string
): GoogleAppsScript.URL_Fetch.HTTPResponse => {
  var options = {
    headers: {
      Authorization:
        "Basic " + Utilities.base64Encode(email + "/token:" + token),
      contentType: "application/json",
      Accept: "application/json",
    },
  };
  return UrlFetchApp.fetch(url, options);
};
