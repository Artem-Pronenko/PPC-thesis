import React, {MouseEvent, useEffect, useState} from 'react'
import FloatingInput from 'components/floatingInput/FloatingInput'
import RadioButton from 'components/radioButton/RadioButton'
import ButtonWave from 'components/buttonWave/ButtonWave'
import {ReactComponent as DoneSvg} from 'assets/icons/done.svg'
import {ReactComponent as DeleteSVG} from 'assets/icons/delete.svg'
import {uid} from 'uid'

interface ICreateField {
  inputText?: string
  inputId: string
  radioButtonIdDone: string
  radioButtonValue: string
  deleteField: (id: string) => void
}

interface IInitialValuesModal1 {
  questionInputName: string
  inputVariantName: string
  radioButtonDoneValue: string
}


const createField = ({
                       inputText = 'Ответ',
                       inputId,
                       radioButtonIdDone,
                       radioButtonValue,
                       deleteField,
                     }: ICreateField) => {

  const buttonIdHtmlDone: string = uid()
  const buttonIdHtmlDelete: string = uid()


  return (
    <div className="form-create-question__group" key={inputId}>
      <FloatingInput name={inputText} placeholder={inputText} id={inputId}/>
      <RadioButton id={`radio-done-${buttonIdHtmlDone}`} value={radioButtonValue} name={radioButtonIdDone}>
        <DoneSvg/>
      </RadioButton>
      <RadioButton
        onClick={() => deleteField(inputId)}
        id={`radio-delete-${buttonIdHtmlDelete}`}
        value={'delete'}
      >
        <DeleteSVG/>
      </RadioButton>
    </div>
  )
}

const QuestionModalOneAnswer = () => {
  const [inputGroup, setInputGroup] = useState<Array<JSX.Element>>([])

  const inputInitialValues: IInitialValuesModal1 = {
    questionInputName: 'Вопрос с несколькими ответами',
    inputVariantName: 'Ответ',
    radioButtonDoneValue: 'done',
  }
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
      return [...prevState, createField({
        inputId,
        radioButtonIdDone: inputInitialValues.radioButtonDoneValue,
        radioButtonValue: radioButtonValue,
        deleteField,
      })]
    })
  }

  useEffect(() => {
    createFieldHandler()
  }, [])


  return (
    <div className="create-question-modal">
      <h3 className="create-question-modal__title">{inputInitialValues.questionInputName}</h3>
      <form className="form form-create-question">
        <FloatingInput name={'Ваш вопрос'} placeholder={'Вопрос'} id={uid()}/>
        <span className="create-question-modal__subtitle">Варианты ответа:</span>
        <div className="form-create-question__variants">
          {inputGroup}
        </div>
        <button
          onClick={(e: MouseEvent) => {
            e.preventDefault()
            createFieldHandler()
          }}
        >
          added
        </button>

        <hr className="form-create-question__hr"/>
        <ButtonWave
          text={'Создать!'}
          onClick={(e: MouseEvent) => {
            e.preventDefault()
          }}
        />
      </form>
    </div>
  )
}

export default QuestionModalOneAnswer
