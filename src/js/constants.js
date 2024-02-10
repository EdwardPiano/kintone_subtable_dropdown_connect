/* eslint-disable import/no-extraneous-dependencies */
import { KintoneRestAPIClient } from '@kintone/rest-api-client'

export default class Constants {
  static TYPE_MASTER_APPID = 2147 //Master AppID

  static client = new KintoneRestAPIClient({
    // Use API token authentication
    //Master Token
    auth: { apiToken: '0o4Tlrntx40vcmALY82uIxB2ZepCtgihVcPkbGuq' },
  })
}
