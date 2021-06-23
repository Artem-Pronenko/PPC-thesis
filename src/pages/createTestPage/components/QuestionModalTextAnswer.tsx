import React, {Dispatch, FC, FormEvent, SetStateAction, useRef, useState} from 'react'
import {uid} from 'uid'
import {INPUT_ANSWER, modalOneAnswerInitialValues, questionType} from 'constant/common'
import {ITestListItem} from 'types/testsTypes'
import FloatingInput from 'components/floatingInput/FloatingInput'
import ButtonWave from 'components/buttonWave/ButtonWave'

interface QuestionModalTestAnswerProps {
  setTestList: Dispatch<SetStateAction<ITestListItem[]>>
}

const QuestionModalTextAnswer: FC<QuestionModalTestAnswerProps> = ({setTestList}) => {
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const formRef = useRef<HTMLFormElement>(null)

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    const formElements: Element[] = Array.from(new Set(formRef?.current?.elements))

    const testData: ITestListItem = {
      id: uid(),
      type: questionType.TEXT_ANSWER,
      question: question,
      answer: '',
      answerOptions: [],
    }

    formElements.forEach(item => {
      if (!(item instanceof HTMLInputElement)) return
      if (item.dataset.typeInput === INPUT_ANSWER) {
        testData.answer = item.value
      }
    })

    setTestList(prevState => [...prevState, testData])
    setQuestion('')
    setAnswer('')
  }

  return (
    <div className="create-question-modal">
      <h3 className="create-question-modal__title">Question with text answer</h3>
      <form className="form form-create-question" onSubmit={submitHandler} ref={formRef}>
        <FloatingInput
          name={'Your question'}
          value={question}
          placeholder={'Question'}
          id={uid()}
          onChange={e => setQuestion(e.target.value)}
        />
        <div className="form-create-question__variants">
          <FloatingInput
            name={'Correct answer'}
            value={answer}
            placeholder={'Answer'}
            id={uid()}
            onChange={e => setAnswer(e.target.value)}
            inputDataSet={INPUT_ANSWER}
          />
        </div>
        <hr className="form-create-question__hr"/>
        <ButtonWave
          text={'Create!'}
          onClick={submitHandler}
        />
      </form>
    </div>
  )
}

export default QuestionModalTextAnswer
