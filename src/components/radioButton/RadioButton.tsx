import React, {FC} from 'react'
import style from './radio-button.module.sass'

interface RadioButtonProps {
  id: string
  value: string
  name?: string
  text?: string
  onClick?: () => void
  datasetId?: string
  datasetType?: string
}

const RadioButton: FC<RadioButtonProps> = ({
                                             id,
                                             value,
                                             text,
                                             name,
                                             children,
                                             onClick,
                                             datasetId,
                                             datasetType,
                                           }) => {
  return (
    <div className={style.form_radio_btn} onClick={onClick}>
      <input id={id} type="radio" name={name ?? ''} value={value} data-id={datasetId} data-type-input={datasetType}/>
      <label htmlFor={id}>{text ?? ''}{children}</label>
    </div>
  )
}

export default RadioButton
