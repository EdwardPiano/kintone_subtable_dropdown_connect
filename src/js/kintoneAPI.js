import Constants from './constants'

export default class kintoneAPI {
  static async getRecrods(APP_ID, queryStr) {
    const resp = await Constants.client.record.getRecords({
      app: APP_ID,
      query: `${queryStr} order by $id asc`,
      totalCount: true,
    })
    return resp
  }
}
