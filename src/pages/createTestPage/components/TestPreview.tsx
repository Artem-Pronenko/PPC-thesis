import React, {FC, FormEvent} from 'react'
import {ITestListItem} from 'types/questionsModalTypes'
import ButtonWave from 'components/buttonWave/ButtonWave'

interface TestPreviewListProps {
  testList: Array<ITestListItem>
  deleteTest: (id: string) => void
  createTest: (e: FormEvent) => void
}

const TestPreview: FC<TestPreviewListProps> = ({testList, deleteTest, createTest}) => {
  return (
    <form>
      {testList.map(el => (
        <div key={el.id} className="question-card test-card question-card__mb">
          <button className="question-card__delete delete" onClick={() => deleteTest(el.id)}>&#10007;</button>
          <h3 className="question-card__title">{el.question}</h3>
          <span className="question-card__subtitle">Варианрты ответа</span>
          <hr className="question-card__hr"/>
          <ul className="question-card__answers">
            {el.answerOptions.map(item => (
              <li
                key={item.id}
                className="question-card__answers-item"
              >{item.answerText} {item.id === el.answer && <span>&#10004;</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <ButtonWave text={'Создать!'} onClick={createTest}/>
    </form>
  )
}

export default TestPreview
