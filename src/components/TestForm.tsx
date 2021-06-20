import React, {FC, LegacyRef} from 'react'
import {IAnswerOptions, ITest, ITestListItem} from 'types/testsTypes'
import {INPUT_ANSWER, questionType} from 'constant/common'
import {uid} from 'uid'
import FloatingInput from './floatingInput/FloatingInput'
import {IUserAnswer} from 'types/dbTypes'

interface TestFormProps {
  formRef: LegacyRef<HTMLFormElement>
  responseTest: ITest
  isSendTest: boolean
  isChecked: (currentAnswerId: string, currentQuestionId: string) => boolean
  userAnswers?: IUserAnswer[]
  correctTestId?: string[]
}

enum CorrectAnswer {
  correct,
  unCorrect,
  notAnswer
}

interface InputProps {
  answerOption: IAnswerOptions
  isSendTest: boolean
  isChecked: (currentAnswerId: string, currentQuestionId: string) => boolean,
  question: ITestListItem
  isCorrectAnswer?: CorrectAnswer
}

const Input: FC<InputProps> = ({
                                 answerOption,
                                 isSendTest,
                                 isChecked,
                                 question,
                                 isCorrectAnswer = CorrectAnswer.notAnswer
                               }) => {
  const getStyle = () => {
    if (isChecked(answerOption.id, question.id)) {
      switch (isCorrectAnswer) {
        case CorrectAnswer.correct:
          return {color: 'green'}
        case CorrectAnswer.unCorrect:
          return {color: 'red'}
        case CorrectAnswer.notAnswer:
          return {color: 'inherit'}
      }
    }
  }

  return (
    <label style={getStyle()}>
      <input
        className="taking-form__input"
        type="radio"
        value={answerOption.id}
        disabled={isSendTest}
        defaultChecked={isChecked(answerOption.id, question.id)}
        name={
          question.type === questionType.YES_OR_NO_ANSWER ||
          question.type === questionType.ONE_ANSWER
            ? question.id
            : uid()
        }
        data-type-input={INPUT_ANSWER}
        data-question={question.id}
      />
      {answerOption.answerText}
    </label>
  )
}

const TestForm: FC<TestFormProps> =
  ({
     formRef,
     responseTest,
     isSendTest,
     isChecked,
     userAnswers,
     correctTestId,
   }) => {
    const getInputName = (question: ITestListItem): string => userAnswers?.filter(e => e.questionId === question.id)[0]?.answerId || 'Ответ'

    return (
      <form className="taking-form" ref={formRef}>
        {responseTest.questions?.map(question => (
          <div key={question.id} className={`taking-card taking-form__card banner ${isSendTest ? 'disabled' : ''}`}>
            <h3>{question.question}</h3>
            {question.type === questionType.TEXT_ANSWER &&
            <FloatingInput
              labelStyle={correctTestId?.includes(getInputName(question)) ? {color: 'green'} : {color: 'red'}}
              name={getInputName(question)}
              placeholder={getInputName(question)}
              id={uid()}
              onChange={(e) => {
              }}
              inputDataSet={questionType.TEXT_ANSWER}
              dataQuestion={question.id}
              isDisabled={!!userAnswers}
            />}
            <ul>
              {question.answerOptions.map(answerOption => (
                <li key={answerOption.id}>
                  {correctTestId && correctTestId.length
                    ? <Input
                      isSendTest={isSendTest}
                      isChecked={isChecked}
                      answerOption={answerOption}
                      question={question}
                      isCorrectAnswer={correctTestId.includes(answerOption.id) ? CorrectAnswer.correct : CorrectAnswer.unCorrect}
                    />
                    : <Input
                      isSendTest={isSendTest}
                      isChecked={isChecked}
                      answerOption={answerOption}
                      question={question}
                    />
                  }
                </li>
              ))}
            </ul>
          </div>
        ))}
        {correctTestId && correctTestId.length !== 0 && (
          <strong>Правильных ответов: {correctTestId.length} из {responseTest.questions.length}</strong>
        )}
      </form>
    )
  }

export default TestForm
