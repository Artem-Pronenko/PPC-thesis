import React, {FC, FormEvent, useContext, useEffect, useRef, useState} from 'react'
import {RouteProps} from 'types/routeTypes'
import {ITest, IUserSendTest} from 'types/dbTypes'
import Loader from 'components/loader/Loader'
import {useDocument} from 'react-firebase-hooks/firestore'
import {FirebaseContext} from 'index'
import useFirestoreSet from 'hooks/useFirestoreSet'
import {INPUT_ANSWER, questionType} from 'constant/common'
import {uid} from 'uid'

const MultiTestPage: FC<RouteProps> = ({match}) => {
  const slug = match.params.slug
  const url = 'usersTestComplete'
  const {setDB} = useFirestoreSet(url)
  const formRef = useRef<HTMLFormElement>(null)
  const {db, auth, firebase} = useContext(FirebaseContext)
  const [response, setResponse] = useState<ITest | null>(null)
  const [isSendTest, setIsSendTest] = useState<boolean>(false)
  const [responseSnapshot, loading, error] = useDocument(db.collection('tests').doc(slug))

  useEffect(() => {
    const data = responseSnapshot?.data()
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
  }, [responseSnapshot])


  const sendTest = async (e: FormEvent) => {
    e.preventDefault()
    const body: IUserSendTest = {
      completeTestId: firebase.firestore.FieldValue.arrayUnion(response!.idDoc),
      completeTest: [
        {
          testId: response!.idDoc,
          answers: []
        }
      ]
    }

    const formElements: Element[] = Array.from(new Set(formRef?.current?.elements))

    formElements.map(item => {
      if (!(item instanceof HTMLInputElement)) return

      if (item.dataset.typeInput === INPUT_ANSWER) {
        if (!item.checked) return
        body.completeTest[0].answers.push({
          answerId: item.value,
          questionId: item.dataset.question!
        })
      }
    })

    setDB({
      body,
      idDoc: auth.currentUser!.uid,
      isMerge: true
    })
    setIsSendTest(true)
  }

  return (
    <div className="taking taking-page">
      {error && (<strong className="error">{error.message}</strong>)}
      {loading && <Loader/>}
      {response && (
        <div>
          <h3 className="taking-page__title">{response.testName}</h3>
          <span className="taking-page__subtitle">{response.testDescription}</span>
          <form className="taking-form" ref={formRef} onSubmit={sendTest}>
            {response.questions?.map(question => (
              <div key={question.id} className={`taking-card taking-form__card banner ${isSendTest ? 'disabled' : ''}`}>
                <h3>{question.question}</h3>
                <ul>
                  {question.answerOptions.map(answerOption => (
                    <li key={answerOption.id}>
                      <label>
                        <input
                          className="taking-form__input"
                          type="radio"
                          value={answerOption.id}
                          disabled={isSendTest}
                          name={question.type === questionType.YES_OR_NO_ANSWER || question.type === questionType.ONE_ANSWER ? question.id : uid()}
                          data-type-input={INPUT_ANSWER}
                          data-question={question.id}
                        />
                        {answerOption.answerText}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {isSendTest
              ? (
                <div className="taking-page__complete-block">
                  <button>Посмотреть историю</button>
                  <strong className="taking-page__complete-text">Тест успешно сдан!</strong>
                </div>
              )
              : <button>Отправить</button>
            }

          </form>
        </div>
      )}
    </div>
  )
}

export default MultiTestPage
