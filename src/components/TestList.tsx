import React, {FC, useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {ITest} from 'types/dbTypes'
import testSVG from 'assets/icons/default_test_logo.svg'
import {studyPageId} from 'pages/StudyPage'
import {declOfNum} from 'utiles'
import {dayDeclOfNum, hourDeclOfNum, minutesDeclOfNum, monthDeclOfNum, yerDeclOfNum} from 'constant/common'

export interface TestListProps {
  testList: ITest[]
  completeTestIds: Array<string>
}
const calcDate = (startDate: number, endDate: number): {available: boolean, string: string} => {
  if ((endDate - startDate) <= 0) return {
    available: false,
    string: 'Не осталось :)'
  }
  const diff = new Date(endDate - startDate)
  const yerDiff = declOfNum(diff.getUTCFullYear() - 1970, yerDeclOfNum)
  const monthsDiff = declOfNum(diff.getUTCMonth(), monthDeclOfNum)
  const daysDiff = declOfNum(diff.getUTCDate(), dayDeclOfNum)
  const hoursDiff = declOfNum(diff.getUTCHours(), hourDeclOfNum)
  const minutesDiff = declOfNum(diff.getUTCMinutes(), minutesDeclOfNum)
  return {
    available: true,
    string: `${yerDiff} ${monthsDiff} ${daysDiff} ${hoursDiff} ${minutesDiff}`
  }
}

export const isActive = (item:  ITest) => !item.isActiveOnExpiration && !calcDate(Date.now(), Date.parse(item.testEndDate)).available

const TestList: FC<TestListProps> = ({testList, completeTestIds}) => {
  const [completeId, setCompleteId] = useState<Array<string>>([])

  useEffect(() => {
    setCompleteId(completeTestIds)
  }, [completeTestIds])

  return (
    <ul className="test-list">
      {testList.map(item => (
        <li className={`test-item ${completeId.includes(item.idDoc) ? 'hide' : ''}`} key={item.idDoc}>
          <div className="test-item__wrapper">
            <div className="test-item__logo">
              <img src={testSVG} alt="test avatar"/>
            </div>
            <div className="test-text">
              <h4 className="test-text__name">{item.testName}</h4>
              <span className="test-text__subtitle">{item.testDescription}</span>
            </div>
          </div>
          <span
            className="test-text__end-time">Осталось: {calcDate(Date.now(), Date.parse(item.testEndDate)).string}</span>
          <NavLink
            onClick={(e) => {
              if (isActive(item)) {
                e.preventDefault()
              }
            }}
            to={`/${studyPageId}/${item.type}/${item.idDoc}`}
            className={`test-item__button button ${isActive(item) ? 'disabled' : ''}`}>
            Пройти
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default TestList
