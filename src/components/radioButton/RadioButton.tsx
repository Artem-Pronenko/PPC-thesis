import React, {FC} from 'react'
import style from './radio-button.module.sass'

interface RadioButtonProps {
  id: string
  value: string
  name: string
  text?: string
}

const RadioButton: FC<RadioButtonProps> = ({id, value, text, name, children}) => {
  return (
    <div className={style.form_radio_btn}>
      <input id={id} type="radio" name={name} value={value}/>
      <label htmlFor={id}>{text ?? ''}{children}</label>
    </div>
  )
}

export default RadioButton
