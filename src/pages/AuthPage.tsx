import React, {useContext, useEffect} from 'react'
import 'firebase/auth'
import {authUser, getOldUser, setUsersData} from 'api'
import {Redirect} from 'react-router-dom'
import {FirebaseContext} from 'index'
import useFirestoreSet from 'hooks/useFirestoreSet'
import {IUserInitialData} from 'types/dbTypes'
import {noUserImg} from 'constant/icons'
import {APIUrls} from 'constant/api_urls'
import {noGroup} from 'constant/api_constants'

export const authPageId: string = 'auth'
const AuthPage = () => {
  const {user} = useContext(FirebaseContext)
  const {setDB, response} = useFirestoreSet(APIUrls.users)

  useEffect(() => {
    ;(async () => {
      if (!user) return
      const res = await getOldUser(user.uid)
      if (res?.data()) return
      const body: IUserInitialData = {
        group: noGroup,
        displayName: user.displayName!,
        idDoc: user.uid,
        photoURL: user.photoURL ?? noUserImg,
        completeTestId: []
      }
      await setUsersData(user.uid, body)
    })()
    return () => {
    }

  }, [user, response, setDB])

  const login = async () => {
    await authUser()
  }

  if (user) {
    return <Redirect to={`/`}/>
  }
  return (
    <div className="auth-page">
      <button className="auth-button" onClick={login}>Войти через Google</button>
    </div>
  )
}

export default AuthPage
