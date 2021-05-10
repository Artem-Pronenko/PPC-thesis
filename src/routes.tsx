import {Switch, Route} from 'react-router-dom'
import React from 'react'
import HomePage from './pages/HomePage'
import UserProfilePage from './pages/UserProfilePage'
import AuthPage from './pages/AuthPage'
import Study from './pages/StudyPage'
import CreateTestPage from './pages/CreateTestPage'

export const Routes = () => {
  return (
    <Switch>
      <Route path={'/'} component={HomePage} exact/>
      <Route path={'/profile'} component={UserProfilePage}/>
      <Route path={'/study'} component={Study} exact/>
      <Route path={'/auth'} component={AuthPage}/>
      <Route path={'/create-test/:slug'} component={CreateTestPage}/>
    </Switch>
  )
}
