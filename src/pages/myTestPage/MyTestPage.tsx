import React, {FC, useCallback, useContext, useEffect, useRef, useState} from 'react'
import {RouteProps} from 'types/routeTypes'
import {useCollection, useDocument} from 'react-firebase-hooks/firestore'
import {APIUrls} from 'constant/api_urls'
import {FirebaseContextProps, IUserAnswer, IUserInitialData, IUserSendTest} from 'types/dbTypes'
import {FirebaseContext} from 'index'
import {usersModel, usersTestCompleteModel} from 'models/tests'
import Modal from 'components/Modal'
import {ITest, ITestListAnswer, ITestView} from 'types/testsTypes'
import {IsCheckedAnswer} from 'utiles'
import TestForm from 'components/TestForm'
import {uid} from 'uid'
import Table from './components/Table'

export type TUserCorrectAnswersLength = Array<{ uid: string, correctAnswerLength: number, group: string }>

export const myTestPageId: string = 'myTest'
const MyTestPage: FC<RouteProps> = ({match}) => {
  const slug = match.params.slug
  const {db} = useContext<FirebaseContextProps>(FirebaseContext)
  const [usersTestCompleteSnapshot] = useCollection<IUserSendTest>(db.collection(APIUrls.usersTestComplete))
  const [testAnswerSnapshot] = useDocument<ITestListAnswer>(db.collection(APIUrls.testsAnswer).doc(slug))
  const [currentTestSnapshot] = useDocument<ITest>(db.collection(APIUrls.tests).doc(slug))
  const [users] = useCollection<IUserSendTest>(db.collection(APIUrls.users))
  const [userTestCompleteData, setUserTestCompleteData] = useState<IUserSendTest[]>([])
  const [userCompleteTest, setUserCompleteTest] = useState<IUserInitialData[]>([])
  const [correctTestAnswers, setCorrectTestAnswers] = useState<ITestListAnswer>()
  const [currentTest, setCurrentTest] = useState<ITest>()
  const [isViewTest, setIsViewTest] = useState<boolean>(false)
  const [viewTest, setViewTest] = useState<ITestView>()
  const [correctTestId, setCorrectTestId] = useState<string[]>([])
  const [userCorrectAnswersLength, setUserCorrectAnswersLength] = useState<TUserCorrectAnswersLength>([])
  const formRef = useRef<HTMLFormElement>(null)

  const getCorrectTestIds = useCallback((currentTestsAnswers: IUserAnswer[]): string[] => {
    const correctAnswers = correctTestAnswers!.answers
    const correctTestIdArr: string[] = []
    for (let i = 0; i < correctAnswers.length; i++) {
      for (let k = 0; k < currentTestsAnswers.length; k++) {
        console.log(currentTestsAnswers[k].answerId )
        if (currentTestsAnswers[k].answerId === correctAnswers[i].correctAnswer) {
          correctTestIdArr.push(currentTestsAnswers[k].answerId)
        }
      }
    }
    return correctTestIdArr
  }, [correctTestAnswers])

  const getCorrectAnswers = useCallback((uid: string): string[] => {
    const currentTestsAnswers: IUserAnswer[] = []
    for (let i = 0; i < userTestCompleteData.length; i++) {
      for (let k = 0; k < userTestCompleteData[i].completeTest.length; k++) {
        if (userTestCompleteData[i].completeTest[k].testId === slug && userTestCompleteData[i].idDoc === uid) {
          currentTestsAnswers.push(...userTestCompleteData[i].completeTest[k].answers)
        }
      }
    }
    if (!correctTestAnswers) return []
    if (!currentTest) return []
    const correctTestIds = getCorrectTestIds(currentTestsAnswers)
    setCorrectTestId(correctTestIds)
    setViewTest({
      userAnswers: currentTestsAnswers,
      correctAnswers: correctTestAnswers,
      testName: currentTest.testName,
      idDoc: currentTest.idDoc,
      currentTest: currentTest
    })
    return correctTestIds
  }, [correctTestAnswers, currentTest, getCorrectTestIds, slug, userTestCompleteData])

  const getCorrectAnswerLength = (e: IUserInitialData) => userCorrectAnswersLength.filter(item => item.uid === e.idDoc)[0]?.correctAnswerLength

  useEffect(() => {
    const correctAnswerLength: TUserCorrectAnswersLength = []
    userCompleteTest.forEach(e => {
      correctAnswerLength.push({correctAnswerLength: getCorrectAnswers(e.idDoc).length, uid: e.idDoc, group: e.group})
    })
    setUserCorrectAnswersLength(correctAnswerLength)
  }, [getCorrectAnswers, userCompleteTest])

  useEffect(() => {
    if (!usersTestCompleteSnapshot) return
    const testComplete: IUserSendTest[] = []
    usersTestCompleteSnapshot.docs.forEach(item => {
      const test = item.data()
      if (test.completeTestId.includes(slug)) {
        testComplete.push(usersTestCompleteModel(test))
      }
    })
    setUserTestCompleteData(testComplete)
  }, [slug, usersTestCompleteSnapshot])

  useEffect(() => {
    if (!users) return
    if (!userTestCompleteData) return
    const userData: IUserInitialData[] = []
    users.docs.forEach(item => {
      const user = item.data()
      userTestCompleteData.forEach(item => {
        if (item.idDoc === user.idDoc) {
          userData.push(usersModel(user))
        }
      })
    })
    setUserCompleteTest(userData)
  }, [users, userTestCompleteData])

  useEffect(() => {
    if (!testAnswerSnapshot || !currentTestSnapshot) return
    setCurrentTest(currentTestSnapshot.data())
    setCorrectTestAnswers(testAnswerSnapshot.data())
  }, [testAnswerSnapshot, currentTestSnapshot])


  useEffect(() => {
  }, [viewTest, correctTestId])
  if (userCompleteTest.length === 0) {
    return <h3>Nobody has passed your test yet:(</h3>
  }
  return (
    <section>
      <h3>Total stats</h3>
      <Table
        userCompleteTest={userCompleteTest}
        getCorrectAnswerLength={getCorrectAnswerLength}
        userCorrectAnswersLength={userCorrectAnswersLength}
        testName={currentTest?.testName || ''}
        userTestCompleteData={userTestCompleteData}
      />
      <h3>Passed the test</h3>
      <Modal active={isViewTest} setActive={setIsViewTest}>
        {viewTest && (
          <TestForm
            key={uid()}
            formRef={formRef}
            isSendTest={true}
            responseTest={viewTest.currentTest}
            userAnswers={viewTest.userAnswers}
            correctTestId={correctTestId}
            isChecked={(currentAnswerId, currentQuestionId) => IsCheckedAnswer({
              currentAnswerId,
              currentQuestionId,
              userAnswers: viewTest.userAnswers
            })}
          />
        )}
      </Modal>

      {userCorrectAnswersLength && userCompleteTest.map(e => (
        <div className="banner user__banner" key={e.idDoc}>
          <img className="user__avatar" src={e.photoURL} alt="user avatar"/>
          <strong>{e.displayName}</strong>
          <strong>{getCorrectAnswerLength(e)} / {currentTest?.questions.length}</strong>
          <button onClick={() => {
            getCorrectAnswers(e.idDoc)
            setIsViewTest(true)
          }}>Answers
          </button>
        </div>
      ))}
    </section>
  )
}

export default MyTestPage
