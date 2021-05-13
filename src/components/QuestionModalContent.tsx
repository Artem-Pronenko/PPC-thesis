import React, {useState, MouseEvent} from 'react'
import FloatingInput from './floatingInput/FloatingInput'
import RadioButton from './radioButton/RadioButton'
import ButtonWave from './buttonWave/ButtonWave'
import {ReactComponent as DoneSvg} from '../assets/icon/done.svg'
import {ReactComponent as DeleteSVG} from '../assets/icon/delete.svg'
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
  buttonIdHtmlDone: string
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

const Modal1 = () => {

  const [inputGroup, setInputGroup] = useState<Array<JSX.Element>>([])

  const inputInitialValues: IInitialValuesModal1 = {
    questionInputName: 'Вопрос с несколькими ответами',
    inputVariantName: 'Ответ',
    radioButtonDoneValue: 'done',
    buttonIdHtmlDone: '1',
  }

  const deleteField = (id: string) => {

    setInputGroup(prevState => prevState.filter(e => e.key !== id))
  }

  return (
    <div className="create-question-modal">
      <h3 className="create-question-modal__title">{inputInitialValues.questionInputName}</h3>
      <form className="form form-create-question">
        <FloatingInput name={'Ваш вопрос'} placeholder={'Вопрос'} id={uid()}/>
        <span className="create-question-modal__subtitle">Варианты ответа:</span>
        <div className="form-create-question__variants">
          <div className="form-create-question__group">
            <FloatingInput
              id={uid()}
              name={inputInitialValues.inputVariantName}
              placeholder={inputInitialValues.inputVariantName}
            />
            <RadioButton
              id={'radio-done-1'}
              value={inputInitialValues.radioButtonDoneValue}
              name={inputInitialValues.radioButtonDoneValue}
            >
              <DoneSvg/>
            </RadioButton>
            <RadioButton id={'radio-delete'} value={'delete'}><DeleteSVG/></RadioButton>
          </div>
          {inputGroup}
        </div>
        <button
          onClick={(e: MouseEvent) => {
            e.preventDefault()
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
            console.log(inputGroup)

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

const Modal2 = () => {
  return (
    <div>Modal2</div>
  )
}

const Modal3 = () => {

  return (
    <div>Modal3</div>
  )
}

const Modal4 = () => {
  return (
    <div className="create-question-modal">
      <h3 className="create-question-modal__title">Вопрос да/нет</h3>
      <form className="form form-create-question">
        <FloatingInput name={'Ваш вопрос'} placeholder={'Вопрос'} id={'id4'}/>
        <span className="create-question-modal__subtitle">Варианты ответа:</span>
        <div className="form-create-question__variants">
          <RadioButton id={'radio-yes'} value={'yes'} text={'Да'} name={'1'}/>
          <RadioButton id={'radio-no'} value={'no'} text={'Нет'} name={'1'}/>
        </div>
        <hr className="form-create-question__hr"/>
        <ButtonWave text={'Создать!'} onClick={() => {
        }}/>
      </form>
    </div>
  )
}


export {Modal4, Modal3, Modal1, Modal2}
