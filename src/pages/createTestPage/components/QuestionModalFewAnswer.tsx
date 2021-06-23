import React, {Dispatch, FC, FormEvent, SetStateAction, useCallback, useEffect, useRef, useState} from 'react'
import FloatingInput from 'components/floatingInput/FloatingInput'
import ButtonWave from 'components/buttonWave/ButtonWave'
import CreateField from './CreateField'
import {INPUT_ANSWER, modalOneAnswerInitialValues, questionType} from 'constant/common'
import {ITestListItem} from 'types/testsTypes'
import {uid} from 'uid'

interface QuestionModalFewAnswerProps {
  setTestList: Dispatch<SetStateAction<ITestListItem[]>>
  maxAnswer: number
}

const QuestionModalFewAnswer: FC<QuestionModalFewAnswerProps> = ({setTestList, maxAnswer}) => {
  const [inputGroup, setInputGroup] = useState<Array<JSX.Element>>([])
  const [question, setQuestion] = useState<string>('')
  const formRef = useRef<HTMLFormElement>(null)

  const deleteField = (id: string) => {
    setInputGroup(prevState => prevState.length > 1
      ? prevState.filter(e => e.key !== id)
      : prevState
    )
  }

  const createFieldHandler = useCallback(() => {
    const inputId: string = uid()
    const radioButtonValue: string = uid()

    setInputGroup(prevState => {
      return [...prevState, CreateField({
        inputId,
        radioButtonDoneName: uid(),
        radioButtonDoneId: radioButtonValue,
        deleteField,
      })]
    })
  }, [])

  useEffect(() => {
    createFieldHandler()
  }, [createFieldHandler])


  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    const formElements: Element[] = Array.from(new Set(formRef?.current?.elements))

    const testData: ITestListItem = {
      id: uid(),
      type: questionType.FEW_ANSWER,
      question,
      answers: [],
      answerOptions: [],
    }

    formElements.forEach(item => {
      if (!(item instanceof HTMLInputElement)) return

      if (item.checked) testData.answers!.push(item.value)

      if (item.dataset.typeInput === INPUT_ANSWER) {
        testData.answerOptions.push({
          answerText: item.value,
          id: item.dataset.id!
        })
      }
    })

    setTestList(prevState => [...prevState, testData])
    setQuestion('')
    setInputGroup([])
    createFieldHandler()
  }

  return (
    <div className="create-question-modal">
      <h3 className="create-question-modal__title">{modalOneAnswerInitialValues.questionInputName}</h3>
      <form className="form form-create-question" onSubmit={submitHandler} ref={formRef}>
        <FloatingInput
          name={'Your question'}
          value={question}
          placeholder={'Question'}
          id={uid()}
          onChange={e => setQuestion(e.target.value)}
        />
        <span className="create-question-modal__subtitle">Answer options:</span>
        <div className="form-create-question__variants">
          {inputGroup}
        </div>
        {maxAnswer > inputGroup.length && <button onClick={(e: FormEvent) => {
          e.preventDefault()
          createFieldHandler()
        }}>new field</button>}


        <hr className="form-create-question__hr"/>
        <ButtonWave
          text={'Create!'}
          onClick={submitHandler}
        />
      </form>
    </div>
  )
}

export default QuestionModalFewAnswer
