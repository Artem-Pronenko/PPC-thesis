import React, {FC} from 'react'
import style from './radio-button.module.sass'

interface RadioButtonProps {
  id: string
  value: string
  name?: string
  text?: string
  onClick?: () => void
}

const RadioButton: FC<RadioButtonProps> = ({id, value, text, name, children, onClick}) => {
  return (
    <div className={style.form_radio_btn} onClick={onClick}>
      <input id={id} type="radio" name={name ?? ''} value={value}/>
      <label htmlFor={id}>{text ?? ''}{children}</label>
    </div>
  )
}

export default RadioButton
