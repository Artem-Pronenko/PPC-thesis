import React, {Dispatch, FC, FormEvent, SetStateAction, useEffect, useRef, useState} from 'react'
import FloatingInput from 'components/floatingInput/FloatingInput'
import ButtonWave from 'components/buttonWave/ButtonWave'
import CreateField from './CreateField'
import {INPUT_ANSWER, oneModalAnswerInitialValues, questionType} from 'constant/common'
import {ITestListItem} from 'types/questionsModalTypes'
import {uid} from 'uid'

interface QuestionModalOneAnswerProps {
  setTestList: Dispatch<SetStateAction<ITestListItem[]>>
}

const QuestionModalOneAnswer: FC<QuestionModalOneAnswerProps> = ({setTestList}) => {
  const [inputGroup, setInputGroup] = useState<Array<JSX.Element>>([])
  const [question, setQuestion] = useState<string>('')
  const formRef = useRef<HTMLFormElement>(null)

  const deleteField = (id: string) => {
    setInputGroup(prevState => prevState.length > 1
      ? prevState.filter(e => e.key !== id)
      : prevState
    )
  }

  const createFieldHandler = () => {
    const inputId: string = uid()
    const radioButtonValue: string = uid()

    setInputGroup(prevState => {
      return [...prevState, CreateField({
        inputId,
        radioButtonDoneName: oneModalAnswerInitialValues.radioButtonDoneValue,
        radioButtonDoneId: radioButtonValue,
        deleteField,
      })]
    })
  }

  useEffect(() => {
    console.log(111)
  })

  useEffect(() => {
    createFieldHandler()
  }, [])


  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    const formElements: Element[] = Array.from(new Set(formRef?.current?.elements))

    const testData: ITestListItem = {
      id: uid(),
      type: questionType.ONE_ANSWER,
      question,
      answer: '',
      answerOptions: [],
    }

    formElements.map(item => {
      if (!(item instanceof HTMLInputElement)) return

      if (item.checked) testData.answer = item.value

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
      <h3 className="create-question-modal__title">{oneModalAnswerInitialValues.questionInputName}</h3>
      <form className="form form-create-question" onSubmit={submitHandler} ref={formRef}>
        <FloatingInput
          name={'Ваш вопрос'}
          value={question}
          placeholder={'Вопрос'}
          id={uid()}
          onChange={e => setQuestion(e.target.value)}
        />
        <span className="create-question-modal__subtitle">Варианты ответа:</span>
        <div className="form-create-question__variants">
          {inputGroup}
        </div>
        <button
          onClick={(e: FormEvent) => {
            e.preventDefault()
            createFieldHandler()
          }}
        >
          added
        </button>

        <hr className="form-create-question__hr"/>
        <ButtonWave
          text={'Создать!'}
          onClick={(e) => {
            setQuestion('')
            console.log(question)
            submitHandler(e)
          }}
        />
      </form>
    </div>
  )
}

export default QuestionModalOneAnswer
