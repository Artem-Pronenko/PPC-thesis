import React from 'react'
import FloatingInput from './floatingInput/FloatingInput'
import RadioButton from './radioButton/RadioButton'
import ButtonWave from './buttonWave/ButtonWave'
import {ReactComponent as DoneSvg} from '../assets/icon/done.svg'
import {ReactComponent as DeleteSVG} from '../assets/icon/delete.svg'

const Modal1 = () => {
  return (
    <div className="create-question-modal">
      <h3 className="create-question-modal__title">Вопрос с несколькими ответами</h3>
      <form className="form form-create-question">
        <FloatingInput name={'Ваш вопрос'} placeholder={'Вопрос'} id={'id1'}/>
        <span className="create-question-modal__subtitle">Варианты ответа:</span>
        <div className="form-create-question__variants">
          <div className="form-create-question__group">
            <FloatingInput name={'Ответ'} placeholder={'Ответ'}  id={'id2'}/>
            <RadioButton id={'radio-done-1'} value={'done'} name={'2'}>
              <DoneSvg/>
            </RadioButton>
            <RadioButton id={'radio-delete'} value={'delete'} name={'111'}><DeleteSVG/></RadioButton>
          </div>
          <div className="form-create-question__group">
            <FloatingInput name={'Ответ'} placeholder={'Ответ'}  id={'id3'}/>
            <RadioButton id={'radio-done-2'} value={'done'} name={'2'}>
              <DoneSvg/>
            </RadioButton>
            <RadioButton id={'radio-delete'} value={'delete'} name={'222'}><DeleteSVG/></RadioButton>
          </div>
        </div>
        <button>added</button>
        <hr className="form-create-question__hr"/>
        <ButtonWave text={'Создать!'} onClick={() => {
        }}/>
      </form>
    </div>
  )
}

const Modal2 = () => {
  return (
    <div className="create-question-modal">
      Modal2
    </div>
  )
}

const Modal3 = () => {

  return (
    <div>
      Modal3
    </div>
  )
}

const Modal4 = () => {
  return (
    <div className="create-question-modal">
      <h3 className="create-question-modal__title">Вопрос да/нет</h3>
      <form className="form form-create-question">
        <FloatingInput name={'Ваш вопрос'} placeholder={'Вопрос'}  id={'id4'}/>
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
