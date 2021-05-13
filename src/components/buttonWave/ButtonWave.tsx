import React, {FC, MouseEvent} from 'react'
import style from './button_wave.module.sass'

interface ButtonWaveProps {
  text: string
  onClick: (e: MouseEvent) => void
}

const ButtonWave: FC<ButtonWaveProps> = ({text, onClick}) => {
  return (
    <div className={style.btn_wave_wrapper}>
      <button className={style.btn_wave} onClick={onClick}>
        <span>{text}</span>
      </button>
    </div>
  )
}

export default ButtonWave
