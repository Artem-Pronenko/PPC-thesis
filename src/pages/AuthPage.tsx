import React from 'react'
import 'firebase/auth'
import {authUser} from '../api'

const AuthPage = () => {
  const login = async () => {
    try {
      const {user} = await authUser()
      console.log(user)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="auth-page">
      <button className="auth-button" onClick={login}>Войти через Google</button>
    </div>
  )
}

export default AuthPage
