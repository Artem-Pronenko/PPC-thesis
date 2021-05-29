import React, {FC, FormEvent, useContext, useEffect, useRef, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {RouteProps} from 'types/routeTypes'
import {ITest, IUserAnswer, IUserCompleteTest} from 'types/dbTypes'
import Loader from 'components/loader/Loader'
import TestForm from 'components/TestForm'
import {useDocument} from 'react-firebase-hooks/firestore'
import {FirebaseContext} from 'index'
import {IsCheckedAnswer} from 'utiles'
import {onSendTest} from 'api'
import {INPUT_ANSWER} from 'constant/common'
import {historyPageId} from '../HistoryPage'
import {APIUrls} from 'constant/api_urls'
import {isActive} from '../../components/TestList';

export const multiTestPageId: string = 'multi'
const MultiTestPage: FC<RouteProps> = ({match}) => {
  const slug = match.params.slug
  const formRef = useRef<HTMLFormElement>(null)
  const {db, user} = useContext(FirebaseContext)
  const [responseTest, setResponseTest] = useState<ITest | null>(null)
  const [userAnswer, setUserAnswer] = useState<IUserAnswer[] | null>(null)
  const [isSendTest, setIsSendTest] = useState<boolean>(false)
  const [testSnapshot, loadingTest, error] = useDocument(db.collection(APIUrls.tests).doc(slug))
  const [userCompleteSnapshot] = useDocument(db.collection(APIUrls.usersTestComplete).doc(user?.uid))

  useEffect(() => {
    // Loading test
    const data = testSnapshot?.data()
    if (!data) return
    if (!user) return
    setResponseTest({
      id: data?.id,
      type: data.type,
      testName: data.testName,
      idDoc: data.idDoc,
      testDescription: data.testDescription,
      questions: data.questions,
      testEndDate: data.testEndDate,
      forGroup: data.forGroup,
      whoCreated: user!.uid,
      isActiveOnExpiration: data.isActiveOnExpiration
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
    setIsSendTest(true)

    const completeTestList: IUserCompleteTest[] = data?.completeTest
    if (completeTestList.length <= 0) return
    const completeTest: IUserCompleteTest = completeTestList.filter(e => e.testId === slug)[0]

    setUserAnswer(completeTest.answers)
  }, [userCompleteSnapshot, slug])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (isActive(responseTest!) || isSendTest) return
    const formElements: Element[] = Array.from(new Set(formRef?.current?.elements))
    const answers: Array<IUserAnswer> = []

    formElements.forEach(item => {
      if (!(item instanceof HTMLInputElement)) return
      if (item.dataset.typeInput === INPUT_ANSWER) {
        if (!item.checked) return
        answers.push({
          answerId: item.value,
          questionId: item.dataset.question!
        })
      }
    })

    await onSendTest({
      urlTest: APIUrls.usersTestComplete,
      urlTestComplete: APIUrls.users,
      responseTestId: responseTest!.idDoc,
      answers,
    })
    setIsSendTest(true)
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
              isChecked={(currentAnswerId, currentQuestionId) => IsCheckedAnswer({
                currentAnswerId,
                currentQuestionId,
                userAnswer
              })}
            />
          )}
          {responseTest && !userAnswer && (
            <TestForm
              formRef={formRef}
              isSendTest={isSendTest}
              responseTest={responseTest}
              isChecked={(currentAnswerId, currentQuestionId) => IsCheckedAnswer({
                currentAnswerId,
                currentQuestionId,
                userAnswer
              })}
            />
          )}
          {isSendTest
            ? (
              <div className="taking-page__complete-block">
                <NavLink className="button" to={`/${historyPageId}/${slug}`}>Посмотреть историю</NavLink>
                <strong className="taking-page__complete-text">Тест успешно сдан!</strong>
              </div>
            )
            : <button
              onClick={handleSubmit}
              className={(isSendTest || isActive(responseTest)) ? 'disabled' : ''}>
              Отправить
            </button>
          }
        </div>
      )}
    </div>
  )
}


export default MultiTestPage
