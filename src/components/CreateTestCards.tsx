import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'

interface CreateTestCardsProps {
  testList: {
    testIcon: string
    testTitle: string
    testType: string
  }[]
}

const CreateTestCards: FC<CreateTestCardsProps> = ({testList}) => {
  return (
    <div className="card-wrapper">
      {testList.map(item => (
        <div className="test-card" key={item.testType}>
          <div className="test-card__content">
            <div className="test-card__img">
              <img src={item.testIcon} alt="icon test"/>
            </div>
            <p className="test-card__text">
              {item.testTitle.length > 85 ? `${item.testTitle.slice(0, 85)}...` : item.testTitle}
            </p>
          </div>
          <NavLink className="test-card__button rainbow" to={`/create-test/${item.testType}`}>
            Создать тест
          </NavLink>
        </div>
      ))}
    </div>
  )
}

export default CreateTestCards
