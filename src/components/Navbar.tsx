import React, {FC, ReactElement} from 'react'
import {NavLink} from 'react-router-dom'
import {LogoSvg, LogoutSvg} from 'constant/icons'
import {signOutUser} from 'api'

interface NavbarProps {
  navList: {
    path: string,
    icon: ReactElement<SVGSVGElement>,
  }[]
}

const Navbar: FC<NavbarProps> = ({navList}) => {

  return (
    <div className="navbar">
      <NavLink to={'/'} className="logo">
        <LogoSvg/>
      </NavLink>
      <nav className="navbar-wrapper">
        <ul className="navbar-list">
          {navList.map(item => (
            <li key={item.path}>
              <NavLink to={item.path} className="nav-link" exact>
                {item.icon}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button className="navbar__button" onClick={() => signOutUser()}>
        <LogoutSvg/>
      </button>
    </div>
  )
}

export default Navbar
