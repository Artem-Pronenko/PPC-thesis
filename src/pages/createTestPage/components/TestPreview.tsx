import React, {Dispatch, FC, FormEvent} from 'react'
import FloatingInput from 'components/floatingInput/FloatingInput'
import {ITestListItem} from 'types/dbTypes'
import {uid} from 'uid'

interface TestPreviewListProps {
  testList: Array<ITestListItem>
  deleteTest: (id: string) => void
  createTest: (e: FormEvent) => void
  setTestName: Dispatch<string>
  testName: string
  testDescription: string
  setTestDescription: Dispatch<string>
  testEndDate: string
  setTestEndDate: Dispatch<string>
}

const TestPreview: FC<TestPreviewListProps> = ({
                                                 testList,
                                                 deleteTest,
                                                 createTest,
                                                 setTestName,
                                                 testName,
                                                 testDescription,
                                                 setTestDescription,
                                                 testEndDate,
                                                 setTestEndDate,
                                               }) => {
  return (
    <form className="create-test create-test__form">
      <FloatingInput
        name={'Имя теста*'}
        placeholder={'Дайте имя тесту'}
        id={uid()}
        onChange={e => setTestName(e.target.value)}
        value={testName}
      />
      <br/>
      <FloatingInput
        name={'Описание теста'}
        placeholder={'Дайте описание теста'}
        id={uid()}
        onChange={e => setTestDescription(e.target.value)}
        value={testDescription}
      />
      <br/>
      <label className="create-test__date-label">
        <span className="create-test__date-icon">&#9760;</span>
        Пройти тест нужно до:
        <input
          type="date"
          className="create-test__date"
          value={testEndDate}
          onChange={e => setTestEndDate(e.target.value)}
        />
      </label>
      <br/>
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
      <button onClick={createTest}>Создать!</button>
    </form>
  )
}

export default TestPreview
