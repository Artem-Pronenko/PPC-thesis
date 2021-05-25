import React, {FC, FormEvent, useContext, useEffect, useRef, useState} from 'react'
import {RouteProps} from 'types/routeTypes'
import {ITest, IUserAnswer, IUserCompleteTest, IUserSendTest} from 'types/dbTypes'
import Loader from 'components/loader/Loader'
import {useDocument} from 'react-firebase-hooks/firestore'
import {FirebaseContext} from 'index'
import useFirestoreSet from 'hooks/useFirestoreSet'
import {INPUT_ANSWER} from 'constant/common'
import TestForm from './components/TestForm'


const MultiTestPage: FC<RouteProps> = ({match}) => {
  const slug = match.params.slug
  const urlUsersTest = 'usersTestComplete'
  const urlUserSettings = 'users'
  const {setDB: setUsersTest} = useFirestoreSet(urlUsersTest)
  const {setDB: setUsersSettings} = useFirestoreSet(urlUserSettings)
  const formRef = useRef<HTMLFormElement>(null)
  const {db, firebase, user} = useContext(FirebaseContext)
  const [responseTest, setResponse] = useState<ITest | null>(null)
  const [userAnswer, setUserAnswer] = useState<IUserAnswer[] | null>(null)
  const [isSendTest, setIsSendTest] = useState<boolean>(false)
  const [testSnapshot, loadingTest, error] = useDocument(db.collection('tests').doc(slug))
  const [userCompleteSnapshot] = useDocument(db.collection('usersTestComplete').doc(user?.uid))

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
    })
  }, [testSnapshot])

  useEffect(() => {
    // Loading user answers
    const data = userCompleteSnapshot?.data()
    if (!data) return
    if (!data?.completeTestId.includes(slug)) {
      setUserAnswer([])
      return
    }
    setIsSendTest(true)

    const completeTestList: IUserCompleteTest[] = data?.completeTest
    if (completeTestList.length <= 0) return
    const completeTest: IUserCompleteTest = completeTestList.filter(e => e.testId === slug)[0]

    setUserAnswer(completeTest.answers)
  }, [userCompleteSnapshot, slug])

  const sendTest = async (e: FormEvent) => {
    e.preventDefault()
    const completeTest: IUserCompleteTest = {
      testId: responseTest!.idDoc,
      answers: []
    }

    const body: IUserSendTest = {
      completeTestId: firebase.firestore.FieldValue.arrayUnion(responseTest!.idDoc),
      completeTest: firebase.firestore.FieldValue.arrayUnion(completeTest)
    }

    const formElements: Element[] = Array.from(new Set(formRef?.current?.elements))

    formElements.forEach(item => {
      if (!(item instanceof HTMLInputElement)) return

      if (item.dataset.typeInput === INPUT_ANSWER) {
        if (!item.checked) return
        completeTest.answers.push({
          answerId: item.value,
          questionId: item.dataset.question!
        })
      }
    })

    setUsersTest({
      body,
      idDoc: user!.uid,
      isMerge: true
    })

    setUsersSettings({
      body: body.completeTestId,
      isMerge: true,
    })
    setIsSendTest(true)
  }

  const isChecked = (currentAnswerId: string, currentQuestionId: string): boolean => {
    let isChecked: boolean = false
    userAnswer?.forEach(e => {
      if (e.questionId === currentQuestionId)
        isChecked = currentAnswerId === e.answerId
    })
    return isChecked
  }


  return (
    <div className="taking taking-page center-page">
      {error && (<strong className="error">{error.message}</strong>)}
      {loadingTest && <Loader/>}
      {responseTest && (
        <div>
          <h3 className="taking-page__title">{responseTest.testName}</h3>
          <span className="taking-page__subtitle">{responseTest.testDescription}</span>
          {userAnswer && (
            <TestForm
              formRef={formRef}
              isSendTest={isSendTest}
              responseTest={responseTest}
              isChecked={isChecked}
              sendTest={sendTest}
              slug={slug}
            />
          )}
          {responseTest && !userAnswer && (
            <TestForm
              formRef={formRef}
              isSendTest={isSendTest}
              responseTest={responseTest}
              isChecked={isChecked}
              sendTest={sendTest}
              slug={slug}
            />
          )}
        </div>
      )}
    </div>
  )
}


export default MultiTestPage
