import React, {Dispatch, FC, FormEvent, SetStateAction, useRef, useState} from 'react'
import FloatingInput from 'components/floatingInput/FloatingInput'
import RadioButton from 'components/radioButton/RadioButton'
import ButtonWave from 'components/buttonWave/ButtonWave'
import {ITestListItem} from 'types/testsTypes'
import {INPUT_ANSWER, questionType} from 'constant/common'
import {uid} from 'uid'


interface QuestionModalYesOrNoProps {
  setTestList: Dispatch<SetStateAction<ITestListItem[]>>
}

const QuestionModalYesOrNo: FC<QuestionModalYesOrNoProps> = ({setTestList}) => {
  const [question, setQuestion] = useState<string>('')
  const formRef = useRef<HTMLFormElement>(null)

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    const formElements: Element[] = Array.from(new Set(formRef?.current?.elements))

    const testData: ITestListItem = {
      id: uid(),
      type: questionType.YES_OR_NO_ANSWER,
      question: question,
      answer: '',
      answerOptions: [],
    }

    formElements.forEach(item => {
      if (!(item instanceof HTMLInputElement)) return
      if (item.checked) testData.answer = item.dataset.id!

      if (item.dataset.typeInput === INPUT_ANSWER) {
        testData.answerOptions.push({
          answerText: item.value,
          id: item.dataset.id!
        })
      }

    })

    setTestList(prevState => [...prevState, testData])

    formElements.map(item => item instanceof HTMLInputElement && (item.checked = false))
    setQuestion('')
  }

  return (
    <div className="create-question-modal">
      <h3 className="create-question-modal__title">Вопрос да/нет</h3>
      <form className="form form-create-question" onSubmit={submitHandler} ref={formRef}>
        <FloatingInput
          name={'Ваш вопрос'}
          placeholder={'Вопрос'}
          id={uid()}
          onChange={e => setQuestion(e.target.value)}
          value={question}
        />
        <span className="create-question-modal__subtitle">Варианты ответа:</span>
        <div className="form-create-question__variants">
          <RadioButton
            id={'radio-yes'}
            value={'Да'}
            text={'Да'}
            name={'1'}
            datasetId={uid()}
            datasetType={INPUT_ANSWER}
          />
          <RadioButton
            id={'radio-no'}
            value={'Нет'}
            text={'Нет'}
            name={'1'}
            datasetId={uid()}
            datasetType={INPUT_ANSWER}
          />
        </div>
        <hr className="form-create-question__hr"/>
        <ButtonWave text={'Создать!'} onClick={submitHandler}/>
      </form>
    </div>
  )
}

export default QuestionModalYesOrNo
