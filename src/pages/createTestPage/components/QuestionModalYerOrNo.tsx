import React from 'react'
import FloatingInput from 'components/floatingInput/FloatingInput'
import RadioButton from 'components/radioButton/RadioButton'
import ButtonWave from 'components/buttonWave/ButtonWave'

const QuestionModalYerOrNo = () => {
  return (
    <div className="create-question-modal">
      <h3 className="create-question-modal__title">Вопрос да/нет</h3>
      <form className="form form-create-question">
        <FloatingInput
          name={'Ваш вопрос'}
          placeholder={'Вопрос'}
          id={'id4'}
          onChange={() => {
        }}
        />
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

export default QuestionModalYerOrNo
