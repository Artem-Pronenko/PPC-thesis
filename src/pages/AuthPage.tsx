import React, {useContext} from 'react'
import 'firebase/auth'
import {authUser} from 'api'
import {Redirect} from 'react-router-dom'
import {FirebaseContext} from 'index'

const AuthPage = () => {
  const {user} = useContext(FirebaseContext)

  const login = async () => {
    try {
      const {user} = await authUser()
      console.log(user)
    } catch (e) {
      console.log(e)
    }
  }

  if (user) {
    return <Redirect to={'/'}/>
  }
  return (
    <div className="auth-page">
      <button className="auth-button" onClick={login}>Войти через Google</button>
    </div>
  )
}

export default AuthPage
