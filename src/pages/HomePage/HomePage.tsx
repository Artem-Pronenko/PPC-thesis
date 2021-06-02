import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useCollection, useDocument} from 'react-firebase-hooks/firestore'
import TestList, {isActive} from 'components/TestList'
import DropDown from 'components/dropDown/DropDown'
import Loader from 'components/loader/Loader'
import TestToggler from './components/TestToggler'
import {BoySvg, DropArrowSvg, noUserImg} from 'constant/icons'
import {APIUrls} from 'constant/api_urls'
import {APITestField, noGroup} from 'constant/api_constants'
import {canStillPass, dropList, IInitialSortList, initialSortList, myGroup, sortAllTests} from 'constant/common'
import {FirebaseContextProps, IUserInitialData, IUserSendTest} from 'types/dbTypes'
import {IGetTestList, ITest} from 'types/testsTypes'
import {testListItemModel} from 'models/tests'
import {getUserInfo} from 'api'
import {FirebaseContext} from 'index'

const HomePage = () => {
  const {user, db} = useContext<FirebaseContextProps>(FirebaseContext)
  const [userTestSnapshot, setUserTestSnapshot] = useState<ITest[]>([])
  const [userTestComplete, setUserTestComplete] = useState<IUserSendTest>()
  const [testsLeft, setTestsLeft] = useState<string>('0')
  const [userInfo, setUserInfo] = useState<IUserInitialData | null>(null)
  const [testListSnapshot, testListLoading] = useCollection(db.collection(APIUrls.tests))
  const [userTestCompleteSnapshot] = useDocument(db.collection(APIUrls.usersTestComplete).doc(user?.uid))
  const [sortList, setSortList] = useState<IInitialSortList>(initialSortList)
  const [initialSortBy, setInitialSortBy] = useState<string>('')

  const getTestsList = useCallback(async ({
                                            sort = false,
                                            sortOptions,
                                            isActiveSort = false
                                          }: IGetTestList): Promise<void> => {
    if (!testListSnapshot) return
    if (sort && sortOptions) {
      const res = await testListSnapshot.query.where(sortOptions.sortField, sortOptions.sortOp, sortOptions.sortValue).get()
      const testList = res.docs.map(item => testListItemModel(item.data()))
      setUserTestSnapshot(testList)
      return
    }
    const testList = testListSnapshot.docs.map(item => testListItemModel(item.data()))
    if (isActiveSort) {
      setUserTestSnapshot(testList.filter(e => !isActive(e)))
      return
    }
    setUserTestSnapshot(testList)
  }, [testListSnapshot])

  useEffect(() => {
    getTestsList({}).then()
  }, [getTestsList])

  useEffect(() => {
    (async () => {
      if (!user) return
      const userInfo = await getUserInfo(user.uid)
      if (!userInfo) return
      setUserInfo(userInfo)
    })()
  }, [user])

  useEffect(() => {
    const userTestComplete = userTestCompleteSnapshot?.data()
    let _testsLeft: string = (userTestSnapshot.length - (userTestComplete?.completeTestId?.length ?? 0)).toString()
    if (+_testsLeft <= 0) _testsLeft = '0'
    setTestsLeft(_testsLeft)
    if (!userTestComplete) return
    setUserTestComplete({
      completeTest: userTestComplete.completeTest,
      completeTestId: userTestComplete.completeTestId
    })
  }, [userTestCompleteSnapshot, userTestSnapshot])

  useEffect(() => {
    switch (initialSortBy) {
      case sortAllTests:
        getTestsList({}).then()
        break
      case myGroup:
        getTestsList({
          sort: true,
          sortOptions: {sortOp: '==', sortField: APITestField.forGroup, sortValue: userInfo?.group ?? noGroup}
        }).then()
        break
      case canStillPass:
        getTestsList({isActiveSort: true}).then()
        break
    }
  }, [initialSortBy, getTestsList, userInfo])

  useEffect(() => {
    return () => {
      setSortList(prevState => prevState.map(e => {
        switch (e.id) {
          case sortAllTests:
            e.active = true
            return e
          default:
            e.active = false
            return e
        }
      }))
    }
  }, [])

  const onSort = async (itemId: string) => {
    setSortList(prevState => prevState.map(e => {
      switch (e.id) {
        case itemId:
          setInitialSortBy(e.id)
          e.active = true
          return e
        default:
          e.active = false
          return e
      }
    }))
  }

  if (!user) return <strong>Ошибка аккаунт не найден!</strong>
  return (
    <div className="home flew-wrapper">
      <div className="left-content">
        <div className="banner home__banner">
          <div className="banner__text">
            <h2 className="banner__title">Привет {user.displayName}</h2>
            <span className="banner-subtitle">Удачного прохождения тестов!)</span>
          </div>
          <div className="banner__image">
            <BoySvg/>
          </div>
        </div>
        <div className="test-banner">
          <div className="test-banner__sort">
            <h3>Список тестов</h3>
            <TestToggler sortList={sortList} onSort={onSort}/>
          </div>
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
                  <img src={user.photoURL ?? noUserImg} alt="user avatar"/>
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
