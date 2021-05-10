import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'

interface NavbarProps {
  navigationList: {
    path: string,
    icon: string,
  }[]
}

const Navbar: FC<NavbarProps> = ({navigationList}) => {
  return (
    <div className="navbar">
      <div className="logo">
        LOGO
      </div>
      <nav className="navbar-wrapper">
        <ul className="navbar-list">
          {navigationList.map(item => (
            <li key={item.path}>
              <NavLink to={item.path} className="nav-link" exact>
                <img src={item.icon} alt="navigation link"/>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="logo">
        LOG OUT
      </div>
    </div>
  )
}

export default Navbar