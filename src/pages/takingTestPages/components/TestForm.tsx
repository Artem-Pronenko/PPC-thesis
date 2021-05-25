import React, {FC, FormEvent, LegacyRef} from 'react'
import {ITest} from 'types/dbTypes'
import {INPUT_ANSWER, questionType} from 'constant/common'
import {NavLink} from 'react-router-dom'
import {uid} from 'uid'

interface TestFormProps {
  formRef: LegacyRef<HTMLFormElement>
  sendTest: (e: FormEvent) => void
  responseTest: ITest
  isSendTest: boolean
  isChecked: (currentAnswerId: string, currentQuestionId: string) => boolean
  slug: string
}

const TestForm: FC<TestFormProps> = ({formRef, sendTest, responseTest, isSendTest, isChecked, slug}) => {
  return (
    <form className="taking-form" ref={formRef} onSubmit={sendTest}>
      {responseTest.questions?.map(question => (
        <div key={question.id} className={`taking-card taking-form__card banner ${isSendTest ? 'disabled' : ''}`}>
          <h3>{question.question}</h3>
          <ul>
            {question.answerOptions.map(answerOption => (
              <li key={answerOption.id}>
                <label>
                  <input
                    className="taking-form__input"
                    type="radio"
                    value={answerOption.id}
                    disabled={isSendTest}
                    defaultChecked={isChecked(answerOption.id, question.id)}
                    name={question.type === questionType.YES_OR_NO_ANSWER || question.type === questionType.ONE_ANSWER ? question.id : uid()}
                    data-type-input={INPUT_ANSWER}
                    data-question={question.id}
                  />
                  {answerOption.answerText}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {isSendTest
        ? (
          <div className="taking-page__complete-block">
            <NavLink className="button" to={`/history/${slug}`}>Посмотреть историю</NavLink>
            <strong className="taking-page__complete-text">Тест успешно сдан!</strong>
          </div>
        )
        : <button>Отправить</button>
      }

    </form>
  )
}

export default TestForm
