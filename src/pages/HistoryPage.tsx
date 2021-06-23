import React, {useContext, useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {FirebaseContext} from 'index'
import {getUserInfo} from 'api'
import {useCollection} from 'react-firebase-hooks/firestore'
import {ITestMinInfo} from 'types/testsTypes'
import Loader from 'components/loader/Loader'
import {APIUrls} from 'constant/api_urls'

export const historyPageId: string = 'history'
const HistoryPage = () => {
  const {db, user} = useContext(FirebaseContext)
  const [completedTest, setCompletedTest] = useState<ITestMinInfo>([])
  const [testsSnapshot, loadingTests, errorLoadingTest] = useCollection(db.collection(APIUrls.tests))

  useEffect(() => {
    (async () => {
      if (!user) return
      const userInfo = await getUserInfo(user.uid)
      if (!userInfo) return
      testsSnapshot?.docs.forEach(testData => {
        const test = testData.data()
        if (userInfo.completeTestId.includes(test.idDoc)) {
          const testName = test.testName
          const testId = test.idDoc
          setCompletedTest(prevState => [...prevState, {testId, testName}])
        }
      })
    })()
    return () => {
    }
  }, [user, testsSnapshot])


  return (
    <div className="history-page">
      {errorLoadingTest && <strong>{errorLoadingTest.message}</strong>}
      {loadingTests && <Loader isMini={true}/>}
      {!completedTest.length && !loadingTests && <strong>You did not pass the tests</strong>}
      {completedTest?.map(test => (
        <div key={test.testId} className="history-page__card banner">
          <h3>{test.testName}</h3>
          <NavLink className="button" to={`/${historyPageId}/${test.testId}`}>Check</NavLink>
        </div>
      ))}
    </div>
  )
}

export default HistoryPage
