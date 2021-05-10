import React from 'react'
import CreateTestCards from '../components/CreateTestCards'
import yesOrNoSVG from '../assets/icon/yes_or_no.svg'

const testList = [
  {
    testIcon: yesOrNoSVG,
    testTitle: 'Тест с двумя вариантами ответа',
    testType: 'yesOrNo',
  },
  {
    testIcon: yesOrNoSVG,
    testTitle: 'Мульти тест (включает в себя любые вопросы)',
    testType: 'multi'
  },
  {
    testIcon: yesOrNoSVG,
    testTitle: 'Тест с Мульти тест (включает в себя любые вопросы) Мульти тест (включает в себя любые вопросы) Мульти тест (включает в себя любые вопросы)',
    testType: 'bad',
  },
]


const StudyPage = () => {
  return (
    <div>
      <CreateTestCards testList={testList}/>
    </div>
  )
}

export default StudyPage
