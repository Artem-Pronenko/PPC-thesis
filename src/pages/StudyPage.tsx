import React from 'react'
import CreateTestCards from '../components/CreateTestCards'
import yesOrNoSVG from '../assets/icons/yes_or_no.svg'

const testList = [
  {
    testIcon: yesOrNoSVG,
    testTitle: 'Two-choice test',
    testType: 'yesOrNo',
  },
  {
    testIcon: yesOrNoSVG,
    testTitle: 'Multi test (includes any questions)',
    testType: 'multi'
  },
]

export const studyPageId: string = 'study'
const StudyPage = () => {
  return (
    <div>
      <CreateTestCards testList={testList}/>
    </div>
  )
}

export default StudyPage
