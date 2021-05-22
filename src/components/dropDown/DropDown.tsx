import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import style from './drop_down.module.scss'

interface DropDownProps {
  dropList: {
    text: string
    path: string
  }[]

}

const DropDown: FC<DropDownProps> = ({children, dropList}) => {
  return (
    <nav className={style.navigation}>
      <ul className={style.links}>
        <li className={style.dropdown}>
          <span className={style.trigger}>{children}</span>
          <ul className={style.drop}>
            {dropList.map(item => (
              <li key={item.text} className={style.dropItem}>
                <NavLink to={item.path} children={item.text} className={style.dropLink}/>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  )
}

export default DropDown
