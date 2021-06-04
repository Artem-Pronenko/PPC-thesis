import React, {ChangeEventHandler, FC} from 'react'
import style from './floating_input.module.scss'

interface FloatingInputProps {
  name: string
  placeholder: string
  id: string
  onChange: ChangeEventHandler<HTMLInputElement>
  inputDataSet?: string
  inputDataSetId?: string
  value?: string
  dataQuestion?: string
  isDisabled?: boolean
}

const FloatingInput: FC<FloatingInputProps> = ({
                                                 name,
                                                 placeholder,
                                                 id,
                                                 onChange,
                                                 inputDataSet = '',
                                                 inputDataSetId = '',
                                                 value,
                                                 dataQuestion,
                                                 isDisabled = false
                                               }) => {
  return (
    <div className={style.form__group}>
      <input
        type="input"
        className={style.form__field}
        placeholder={placeholder}
        name={name}
        id={id}
        onChange={onChange}
        data-type-input={inputDataSet}
        data-id={inputDataSetId}
        value={value}
        required
        data-question={dataQuestion}
        disabled={isDisabled}
      />
      <label htmlFor={id} className={style.form__label}>{name}</label>
    </div>
  )
}

export default FloatingInput
