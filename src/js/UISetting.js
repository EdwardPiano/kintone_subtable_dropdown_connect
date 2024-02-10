/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { Table, Dropdown } from 'kintone-ui-component'
import kintoneAPI from './kintoneAPI'
import Constants from './constants'

// 大分類元素
let bigtypeComponent
const setSubTable = async (event) => {
  try {
    const { record } = event
    // 獲取kintone表格
    const kintoneSubTable = record['表格'].value
    // 擷取[大分類、小分類]資料、建立客製化表格的default值
    const orgSubTableDefaultData = kintoneSubTable.reduce((acc, cur) => {
      const data = cur.value
      return [
        ...acc,
        {
          bigType: data['大分類'].value,
          smalType: data['小分類'].value,
        },
      ]
    }, [])
    const resp = await kintoneAPI.getRecrods(Constants.TYPE_MASTER_APPID, '')
    const { records } = resp
    // [大分類]對應[小分類]資料集
    const relatedData = records.reduce((acc, cur) => {
      const bigType = cur['大分類'].value
      const smallType = cur['小分類'].value
      if (!acc[bigType]) {
        acc[bigType] = []
      }
      acc[bigType].push({ label: smallType, value: smallType })
      return acc
    }, {})
    // 大分類預設需要的值
    const bigTypeOption = Object.keys(relatedData).reduce((acc, cur) => {
      return [
        ...acc,
        {
          label: cur,
          value: cur,
        },
      ]
    }, [])
    // 小分類預設需要的值
    const smallTypeOption = kintoneSubTable.reduce((acc, cur) => {
      const data = cur.value
      return [
        ...acc,
        {
          label: data['小分類'].value,
          value: data['小分類'].value,
        },
      ]
    }, [])
    // 渲染[小分類]
    const rendersmallType = (cellData, rowData) => {
      const dropdownSmallType = new Dropdown({
        items: smallTypeOption,
        value: cellData,
      })
      bigtypeComponent.addEventListener('change', (changeEvent) => {
        console.log('change', changeEvent.detail.value)
        dropdownSmallType.items = relatedData[changeEvent.detail.value]
      })
      return dropdownSmallType
    }

    // 渲染[大分類]
    const renderBigType = (cellData) => {
      const dropdownBigType = new Dropdown({
        items: bigTypeOption,
        value: cellData,
      })
      bigtypeComponent = dropdownBigType
      return dropdownBigType
    }

    const columns = [
      {
        title: '大分類',
        field: 'bigType',
        render: renderBigType,
      },
      {
        title: '小分類',
        field: 'smalType',
        render: rendersmallType,
      },
    ]

    // 預設值
    const data = orgSubTableDefaultData
    // 客製化表格
    const table = new Table({ columns, data, id: 'orgSubTable' })
    // 放置位置
    const space = kintone.app.record.getSpaceElement('tableSpace')
    space.appendChild(table)
  } catch (err) {
    console.error(err.toString())
    event.error = "API呼叫失敗，請聯絡管理員!"
  }
}

export default setSubTable
