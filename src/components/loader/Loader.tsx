import React, {FC} from 'react'
import style from './loader.module.scss'

interface LoaderProps {
  isMini?: boolean
}

const Loader: FC<LoaderProps> = ({isMini = false}) => {
  return (
    <div className={isMini ? '' : style.ldioBg}>
      <div className={isMini ? style.ldioWrapperMini : style.ldioWrapper}>
        <div className={style.ldio1}/>
        <div className={style.ldio2}/>
        <div className={style.ldio3}/>
        <div className={style.ldio4}/>
        <div className={style.ldio5}/>
        <div className={style.ldio6}/>
        <div className={style.ldio7}/>
        <div className={style.ldio8}/>
      </div>
    </div>
  )
}

export default Loader
