import React, {FC, useEffect, useRef, useState} from 'react'
import {IUserInitialData, IUserSendTest} from 'types/dbTypes'
import {TUserCorrectAnswersLength} from '../MyTestPage'

interface TableProps {
  userCompleteTest: IUserInitialData[]
  getCorrectAnswerLength: (e: IUserInitialData) => number | undefined
  userCorrectAnswersLength: TUserCorrectAnswersLength
  testName: string
  userTestCompleteData: IUserSendTest[]
}

const Table: FC<TableProps> = ({
                                 userCompleteTest,
                                 getCorrectAnswerLength,
                                 userCorrectAnswersLength,
                                 testName,
                                 userTestCompleteData
                               }) => {
  const [correctTestTable, setCorrectTestTable] = useState<Array<{ group: string, correct: number }>>([])
  const [timeComplete, setTimeComplete] = useState<Array<IUserSendTest>>([])
  const tableRef = useRef<HTMLTableElement>(null)

  useEffect(() => {
    if (!userTestCompleteData) return
    const userTests: Array<IUserSendTest> = []
    userTestCompleteData.forEach(item => userTests.push(item))
    setTimeComplete(userTests)
  }, [userTestCompleteData])

  useEffect(() => {
    const tmpArray: Array<string> = [];
    let group = userCorrectAnswersLength
      .map(e => {
        return {
          correct: 0,
          group: e.group
        }
      })
      .filter((item) => {
        return (tmpArray.indexOf(item.group) === -1) && tmpArray.push(item.group)
      })

    userCorrectAnswersLength.map(e => {
      group = group.map(item => {
        if (item.group === e.group) {

          return {
            group: item.group,
            correct: item.correct + e.correctAnswerLength
          }
        } else {
          return item
        }
      })
      return e.group
    })
    setCorrectTestTable(group)
  }, [userCorrectAnswersLength])

  const getCompleteTime = (userId: string, testId: string[]) => {
    const time = timeComplete.filter(e => e.idDoc === userId)[0]?.timeComplete.filter(e => testId.includes(e.testId))[0]?.completeTest
    return new Date(time).toLocaleTimeString()
  }

  const printWindow = () => {
    let newWindow = window.open('', 'PRINT', 'height=700, width=1000');
    newWindow!.document.body.innerHTML = `
    <html lang="en">
    <head>
      <title>${testName}</title>
      <style>
          table {width: 100%;margin-bottom: 20px;border: 1px solid #dddddd;border-collapse: collapse;}
          table th {font-weight: bold;padding: 5px;background: #efefef;border: 1px solid #dddddd;}
          table td {border: 1px solid #dddddd;padding: 5px;}
      </style>
    </head>
        <body>
            ${tableRef.current!.outerHTML}
        </body>
    </html>
      `
    newWindow!.print();
  }
  return (
    <div>
      <table className="table" ref={tableRef} id={'table'}>
        <thead>
        <tr>
          <th>Полное имя</th>
          <th>Баллов</th>
          <th>Группа</th>
          <th>Время сдачи</th>
          <th>Сумма баллов в группе</th>
        </tr>
        </thead>
        <tbody>
        {userCompleteTest && userCompleteTest.map(e => (
          <tr key={e.idDoc}>
            <td>{e.displayName}</td>
            <td>{getCorrectAnswerLength(e)}</td>
            <td>{e.group}</td>
            <td>{getCompleteTime(e.idDoc, e.completeTestId)}</td>
            <td>{correctTestTable.filter(item => item.group === e.group)[0]?.correct}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <button onClick={printWindow}>Печать</button>
    </div>
  )
}

export default Table
