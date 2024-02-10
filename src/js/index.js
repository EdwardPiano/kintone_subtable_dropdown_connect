/* eslint-disable no-return-await */
/* eslint-disable no-param-reassign */
import setSubTable from './UISetting'

const processStart = async (event) => {
  kintone.app.record.setFieldShown('表格', false)
  await setSubTable(event)
  return event
}
const getSubTableData = (event) => {
  const { record } = event
  const subTable = document.getElementById('orgSubTable')
  console.log(subTable.data)
  console.log(event)
  const newSubTableData = subTable.data.reduce((acc, cur) => {
    return [
      ...acc,
      {
        value: {
          大分類: {
            type: 'SINGLE_LINE_TEXT',
            value: cur.bigType,
          },
          小分類: {
            type: 'SINGLE_LINE_TEXT',
            value: cur.smalType,
          },
        },
      },
    ]
  }, [])
  console.log(newSubTableData)
  record['表格'].value = newSubTableData
  return event
}

kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], getSubTableData)
kintone.events.on(['app.record.create.show', 'app.record.edit.show'], processStart)
