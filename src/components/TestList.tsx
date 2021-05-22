import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import {ITest} from 'types/dbTypes'
import testSVG from 'assets/icons/default_test_logo.svg'

export interface TestListProps {
  testList: ITest[]
}

const TestList: FC<TestListProps> = ({testList}) => {

  return (
    <ul className="test-list">
      {testList.map(item => (
        <li className="test-item" key={item.idDoc}>
          <div className="test-item__wrapper">
            <div className="test-item__logo">
              <img src={testSVG} alt="test avatar"/>
            </div>
            <div className="test-text">
              <h4 className="test-text__name">{item.testName}</h4>
              <span className="test-text__subtitle">{item.testDescription}</span>
            </div>
          </div>
          <span className="test-text__end-time">До окончания: 1ч 20мин</span>
          <NavLink to={`/study/${item.type}/${item.idDoc}`} className="test-item__button button">Пройти</NavLink>
        </li>
      ))}
    </ul>
  )
}

export default TestList
