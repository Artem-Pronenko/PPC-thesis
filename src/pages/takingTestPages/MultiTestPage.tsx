import React, {FC, useContext, useEffect, useState} from 'react'
import {RouteProps} from 'types/routeTypes'
import {useDocument} from 'react-firebase-hooks/firestore'
import {FirebaseContext} from 'index'
import {ITest} from '../../types/dbTypes';

const MultiTestPage: FC<RouteProps> = ({match}) => {
  const slug = match.params.slug
  const {db} = useContext(FirebaseContext)
  const [response, setResponse] = useState<ITest>()
  const [responseSnapshot, loading, error] = useDocument(
    db.collection('tests').doc(slug)
  )

  useEffect(() => {
    const data = responseSnapshot?.data()
    setResponse({
      id: data?.id,
      type: data?.type,
      testName: data?.testName,
      idDoc: data?.idDoc,
      testDescription: data?.testDescription,
      answers: data?.answers,
      testEndDate: data?.testEndDate,
    })
    console.log(response)

  }, [responseSnapshot])

  if (response) {
    return (
      <div className="taking taking-page">
        <h3>{response.testName}</h3>
        <span>{response.testDescription}</span>
        <form className="taking-form">
            {response.answers?.map(item => (
              <div key={item.id} className="taking-card taking-form__card banner">
                <h3>{item.question}</h3>
                <ul>
                  {item.answerOptions.map(item => (
                    <li>{item.answerText}</li>
                  ))}
                </ul>
              </div>
            ))}

        </form>
      </div>
    )
  }
  return (
    <div>
      {error && (<strong className="error">{error.message}</strong>)}
    </div>
  )
}

export default MultiTestPage
