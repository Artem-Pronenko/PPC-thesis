import React from 'react'
import FloatingInput from 'components/floatingInput/FloatingInput'
import RadioButton from 'components/radioButton/RadioButton'
import {ReactComponent as DoneSvg} from 'assets/icons/done.svg'
import {ReactComponent as DeleteSVG} from 'assets/icons/delete.svg'
import {INPUT_ANSWER} from 'constant/common'
import {uid} from 'uid'


interface ICreateField {
  inputText?: string
  inputId: string
  radioButtonDoneName: string
  radioButtonDoneId: string
  deleteField: (id: string) => void,
}

const CreateField = ({
                       inputText = 'Ответ',
                       inputId,
                       radioButtonDoneName,
                       radioButtonDoneId,
                       deleteField,
                     }: ICreateField) => {

  const buttonIdHtmlDone: string = uid()
  const buttonIdHtmlDelete: string = uid()


  return (
    <div className="form-create-question__group" key={inputId}>
      <FloatingInput
        name={inputText}
        placeholder={inputText}
        id={inputId}
        inputDataSet={INPUT_ANSWER}
        inputDataSetId={radioButtonDoneId}
        onChange={e => {
        }}
      />
      <RadioButton id={`radio-done-${buttonIdHtmlDone}`} value={radioButtonDoneId} name={radioButtonDoneName}>
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


export default CreateField
