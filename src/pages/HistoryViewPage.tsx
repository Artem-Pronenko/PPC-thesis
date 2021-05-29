import React, {FC, useContext, useEffect, useRef, useState} from 'react'
import {RouteProps} from 'types/routeTypes'
import {useDocument} from 'react-firebase-hooks/firestore'
import {FirebaseContext} from 'index'
import {ITest, IUserCompleteTest} from 'types/dbTypes'
import {IUserAnswer} from 'types/dbTypes'
import TestForm from 'components/TestForm'
import {IsCheckedAnswer} from 'utiles'
import Loader from 'components/loader/Loader'
import {APIUrls} from 'constant/api_urls'

const HistoryViewPage: FC<RouteProps> = ({match}) => {
  const slug: string = match.params.slug
  const formRef = useRef<HTMLFormElement>(null)
  const {db, user} = useContext(FirebaseContext)
  const [responseTest, setResponse] = useState<ITest | null>(null)
  const [userAnswer, setUserAnswer] = useState<IUserAnswer[] | null>(null)
  const [userCompleteSnapshot, loadingCompleteTest, errorLoadingCompleteTest] = useDocument(
    db.collection(APIUrls.usersTestComplete).doc(user?.uid)
  )
  const [testSnapshot, loadingTest, errorLoadingTest] = useDocument(db.collection(APIUrls.tests).doc(slug))

  useEffect(() => {
    // Loading test
    const data = testSnapshot?.data()
    if (!data) return
    setResponse({
      id: data?.id,
      type: data.type,
      testName: data.testName,
      idDoc: data.idDoc,
      testDescription: data.testDescription,
      questions: data.questions,
      testEndDate: data.testEndDate,
      forGroup: data.forGroup,
      whoCreated: user!.uid,
      isActiveOnExpiration: data.isActiveOnExpiration,
    })
  }, [testSnapshot, user])

  useEffect(() => {
    // Loading user answers
    const data = userCompleteSnapshot?.data()
    if (!data) return
    if (!data?.completeTestId.includes(slug)) {
      setUserAnswer([])
      return
    }

    const completeTestList: IUserCompleteTest[] = data?.completeTest
    if (completeTestList.length <= 0) return
    const completeTest: IUserCompleteTest = completeTestList.filter(e => e.testId === slug)[0]

    setUserAnswer(completeTest.answers)
  }, [userCompleteSnapshot, slug])


  return (
    <div>
      {
        (errorLoadingTest || errorLoadingCompleteTest) &&
        <strong>{errorLoadingTest?.message}{errorLoadingCompleteTest?.message}</strong>
      }
      {(loadingCompleteTest ||  loadingTest) && <Loader/>}
      {responseTest && (
        <div>
          <h3 className="taking-page__title">{responseTest.testName}</h3>
          <span className="taking-page__subtitle">{responseTest.testDescription}</span>
          <TestForm
            formRef={formRef}
            isSendTest={true}
            responseTest={responseTest}
            isChecked={(currentAnswerId, currentQuestionId) => IsCheckedAnswer({
              currentAnswerId,
              currentQuestionId,
              userAnswer
            })}
          />
        </div>
      )}
    </div>
  )
}

export default HistoryViewPage
