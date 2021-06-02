import React, {FC, LegacyRef} from 'react'
import {ITest} from 'types/testsTypes'
import {INPUT_ANSWER, questionType} from 'constant/common'
import {uid} from 'uid'

interface TestFormProps {
  formRef: LegacyRef<HTMLFormElement>
  responseTest: ITest
  isSendTest: boolean
  isChecked: (currentAnswerId: string, currentQuestionId: string) => boolean
}

const TestForm: FC<TestFormProps> = ({formRef, responseTest, isSendTest, isChecked}) => {
  return (
    <form className="taking-form" ref={formRef}>
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
    </form>
  )
}

export default TestForm
