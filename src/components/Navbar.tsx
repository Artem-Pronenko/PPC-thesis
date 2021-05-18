import React, {FC, ReactElement, useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {LogoSvg, LogoutSvg} from 'constant/icons'
import {FirebaseContext} from 'index'

interface NavbarProps {
  navigationList: {
    path: string,
    icon: ReactElement<SVGSVGElement>,
  }[]
}

const Navbar: FC<NavbarProps> = ({navigationList}) => {
  const {auth} = useContext(FirebaseContext)

  return (
    <div className="navbar">
      <NavLink to={'/'} className="logo">
        <LogoSvg/>
      </NavLink>
      <nav className="navbar-wrapper">
        <ul className="navbar-list">
          {navigationList.map(item => (
            <li key={item.path}>
              <NavLink to={item.path} className="nav-link" exact>
                {item.icon}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button onClick={() => auth.signOut()}>
        <LogoutSvg/>
      </button>
    </div>
  )
}

export default Navbar
