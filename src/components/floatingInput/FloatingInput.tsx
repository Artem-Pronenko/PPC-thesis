import React, {FC} from 'react'
import style from './floating_input.module.scss'

interface FloatingInput {
  name: string
  placeholder: string
  id: string
}


const FloatingInput: FC<FloatingInput> = ({name, placeholder, id}) => {
  return (
    <div className={style.form__group}>
      <input type="input" className={style.form__field} placeholder={placeholder} name={name} id={id} required/>
      <label htmlFor={id} className={style.form__label}>{name}</label>
    </div>
  )
}

export default FloatingInput
