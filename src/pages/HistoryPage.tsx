import React, {useContext, useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {FirebaseContext} from 'index'
import {getUserInfo} from 'api'
import {useCollection} from 'react-firebase-hooks/firestore'
import {ITestMinInfo} from 'types/dbTypes'
import Loader from 'components/loader/Loader'

const HistoryPage = () => {
  const {db, user} = useContext(FirebaseContext)
  const [completedTest, setCompletedTest] = useState<ITestMinInfo>([])
  const [testsSnapshot, loadingTests, errorLoadingTest] = useCollection(db.collection('tests'))

  useEffect(() => {
    (async () => {
      if (!user) return
      const userData = await getUserInfo(user.uid)
      if (!userData) return
      const completeTest = userData.data()
      testsSnapshot?.docs.forEach(testData => {
        const test = testData.data()
        if (completeTest?.completeTestId.includes(test.idDoc)) {
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
      {!completedTest.length && !loadingTests && <strong>Вы не проходили тесты</strong>}
      {completedTest?.map(test => (
        <div key={test.testId} className="history-page__card banner">
          <h3>{test.testName}</h3>
          <NavLink className="button" to={`history/${test.testId}`}>Посмотреть</NavLink>
        </div>
      ))}
    </div>
  )
}

export default HistoryPage
