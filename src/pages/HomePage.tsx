import React, {useContext, useEffect, useState} from 'react'
import TestList from 'components/TestList'
import DropDown from 'components/dropDown/DropDown'
import Loader from 'components/loader/Loader'
import {BoySvg, DropArrowSvg, noUserImg} from 'constant/icons'
import {FirebaseContextProps, ITest, IUserSendTest} from 'types/dbTypes'
import {FirebaseContext} from 'index'
import {useCollection, useDocument} from 'react-firebase-hooks/firestore'

const dropList = [
  {
    text: 'Мой профиль',
    path: '/profile',
  },
  {
    text: 'Что-то еще',
    path: '/',
  },
]

const HomePage = () => {
  const {user, db} = useContext<FirebaseContextProps>(FirebaseContext)
  const [userTestSnapshot, setUserTestSnapshot] = useState<ITest[]>([])
  const [userTestComplete, setUserTestComplete] = useState<IUserSendTest>()
  const [testsLeft, setTestsLeft] = useState<string>('0')
  const [testListSnapshot, testListLoading] = useCollection(db.collection('tests'))
  const [userTestCompleteSnapshot] = useDocument(db.collection('usersTestComplete').doc(user?.uid))


  useEffect(() => {
    testListSnapshot?.docs.forEach(item => {
      const testListItem = item.data()
      setUserTestSnapshot(prevState => [...prevState, {
        id: testListItem?.id,
        idDoc: testListItem.idDoc,
        testDescription: testListItem.testDescription,
        testEndDate: testListItem.testEndDate,
        testName: testListItem.testName,
        type: testListItem.type,
        questions: testListItem.questions,
      }])
    })
    return () => {
    }
  }, [testListSnapshot])


  useEffect(() => {
    const userTestComplete = userTestCompleteSnapshot?.data()
    const _testsLeft: string = (userTestSnapshot.length - (userTestComplete?.completeTestId?.length ?? 0)).toString()
    setTestsLeft(_testsLeft)
    if (!userTestComplete) return
    setUserTestComplete({
      completeTest: userTestComplete.completeTest,
      completeTestId: userTestComplete.completeTestId
    })
  }, [userTestCompleteSnapshot, userTestSnapshot])

  return (
    <div className="home flew-wrapper">
      <div className="left-content">
        <div className="banner home__banner">
          <div className="banner__text">
            <h2 className="banner__title">Привет {user?.displayName}</h2>
            <span className="banner-subtitle">Удачного прохождения тестов!)</span>
          </div>
          <div className="banner__image">
            <BoySvg/>
          </div>
        </div>
        <div>
          <h3>Активные тесты</h3>
          {testListLoading && <Loader isMini={true}/>}
          {!testListLoading && !userTestSnapshot.length && <strong>Активных тестов нет!)</strong>}
          <TestList testList={userTestSnapshot} completeTestIds={userTestComplete?.completeTestId ?? []}/>
        </div>
      </div>
      <div className="right-content">
        <nav>
          <ul className="right-content__navigation">
            <li>
              <form role="search" className="search-form">
                <input className="search-input" type="search" placeholder="Название теста..." required/>
                <button className="search-form-button" type="submit">Go!</button>
              </form>
            </li>
            <li className="user-button">
              <DropDown dropList={dropList}>
                <div className="user-button__avatar">
                  <img src={user?.photoURL ?? noUserImg} alt="user avatar"/>
                </div>
                <DropArrowSvg className="user-button__icon"/>
              </DropDown>
            </li>
          </ul>
        </nav>
        <div className="banners">
          <div className="banner test-info home__banner">
            <span className="test-info__number">{userTestComplete?.completeTest.length ?? 0}</span>
            <h4 className="test-info__title">Тестов пройдено</h4>
          </div>
          <div className="banner test-info home__banner">
            <span className="test-info__number">{testsLeft}</span>
            <h4 className="test-info__title">Тестов осталось</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
