import { env } from "./env"

/**
 * main(GASで実行する関数)
 * @param e
 * @returns
 */
global.main = function (e: any) {
  let pageNo = 1
  let has_not_now_item = false
  const now = new Date()
  const nowStr =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
  const baseUrl = env.scraping.baseUrl

  while (true) {
    let url = baseUrl.replace("%d", pageNo.toString())
    const response = UrlFetchApp.fetch(url)
    const html = response.getContentText("UTF-8")

    const $ = Cheerio.load(html)
    const list = $(".pr_search_result_box .item-common")
    list.each((index, element) => {
      const date_node = $(element).find(".date")
      if (!date_node) return
      const date = new Date(
        date_node.text().replace(/年|月/g, "/").replace(/日/g, "")
      )
      const dateStr =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

      if (dateStr === nowStr) {
        const tire = {
          title: "",
          maker: "",
          brand: "",
          series: "",
          type: "",
          posted_at: "",
          url: "",
        }
        tire.title = $(element).find(".title a").text()
        tire.maker = $(element).find(".maker td").text()
        const brand_node = $(element).find(".brand td")
        tire.brand = brand_node ? brand_node.text() : "その他"
        const series_node = $(element).find(".series td")
        tire.series = series_node ? series_node.text() : "その他"
        tire.type = $(element).find(".tiretype td").text()
        tire.posted_at = nowStr
        const url_node = $(element).find(".contents-bottom")
        tire.url = url_node ? url_node.attr("href") ?? "" : "その他"
        console.log(tire)
      } else {
        has_not_now_item = true
      }
    })
    if (has_not_now_item) break
    pageNo++
  }
}
