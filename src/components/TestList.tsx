import React, {FC} from 'react'

export interface TestListProps {
  testList: {
    testName: string
    testSubtitle: string
    endTime: Date
    logo: string
    id: number
  }[]
}

const TestList: FC<TestListProps> = ({testList}) => {
  return (
    <ul className="test-list">
      {testList.map(item => (
        <li className="test-item" key={item.id}>
          <div className="test-item__wrapper">
            <div className="test-item__logo">
              <img src={item.logo} alt="test avatar"/>
            </div>
            <div className="test-text">
              <h4 className="test-text__name">{item.testName}</h4>
              <span className="test-text__subtitle">{item.testSubtitle}</span>
            </div>
          </div>
          <span className="test-text__end-time">До окончания: 1ч 20мин</span>
          <button className="test-item__button">Пройти</button>
        </li>
      ))}
    </ul>
  )
}

export default TestList
