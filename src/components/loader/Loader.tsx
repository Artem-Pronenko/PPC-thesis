import React from 'react'
import style from './loader.module.scss'

const Loader = () => {
  return (
    <div className={style.ldioBg}>
      <div className={style.ldioWrapper}>
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
