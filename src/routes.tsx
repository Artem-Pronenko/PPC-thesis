import {Switch, Route} from 'react-router-dom'
import React from 'react'
import HomePage from 'pages/HomePage'
import UserProfilePage from 'pages/UserProfilePage'
import AuthPage from 'pages/AuthPage'
import Study from 'pages/StudyPage'
import HistoryPage from 'pages/HistoryPage'
import CreateTestPage from 'pages/createTestPage/CreateTestPage'
import MultiTestPage from 'pages/takingTestPages/MultiTestPage'
import HistoryViewPage from 'pages/HistoryViewPage'

export const Routes = () => {
  return (
    <Switch>
      <Route path={'/'} component={HomePage} exact/>
      <Route path={'/profile'} component={UserProfilePage}/>
      <Route path={'/study'} component={Study} exact/>
      <Route path={'/study/multi/:slug'} component={MultiTestPage}/>
      <Route path={'/auth'} component={AuthPage}/>
      <Route path={'/history'} component={HistoryPage} exact/>
      <Route path={'/history/:slug'} component={HistoryViewPage}/>
      <Route path={'/create-test/:slug'} component={CreateTestPage}/>
    </Switch>
  )
}
