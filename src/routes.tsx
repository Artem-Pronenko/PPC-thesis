import {Switch, Route} from 'react-router-dom'
import React from 'react'
import HomePage from 'pages/HomePage/HomePage'
import UserProfilePage, {userProfilePageId} from 'pages/UserProfilePage'
import AuthPage, {authPageId} from 'pages/AuthPage'
import Study, {studyPageId} from 'pages/StudyPage'
import HistoryPage, {historyPageId} from 'pages/HistoryPage'
import CreateTestPage, {createTestPageId} from 'pages/createTestPage/CreateTestPage'
import MultiTestPage, {multiTestPageId} from 'pages/takingTestPages/MultiTestPage'
import HistoryViewPage from 'pages/HistoryViewPage'
import MyTestPage, {myTestPageId} from './pages/myTestPage/MyTestPage'

export const Routes = () => {
  return (
    <Switch>
      <Route path={`/`} component={HomePage} exact/>
      <Route path={`/${userProfilePageId}`} component={UserProfilePage}/>
      <Route path={`/${studyPageId}`} component={Study} exact/>
      <Route path={`/${studyPageId}/${multiTestPageId}/:slug`} component={MultiTestPage}/>
      <Route path={`/${authPageId}`} component={AuthPage}/>
      <Route path={`/${historyPageId}`} component={HistoryPage} exact/>
      <Route path={`/${historyPageId}/:slug`} component={HistoryViewPage}/>
      <Route path={`/${createTestPageId}/:slug`} component={CreateTestPage}/>
      <Route path={`/${myTestPageId}/:slug/:slug`} component={MyTestPage}/>
    </Switch>
  )
}
