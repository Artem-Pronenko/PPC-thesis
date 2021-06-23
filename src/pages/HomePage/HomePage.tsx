import React, {ChangeEvent, SyntheticEvent, useCallback, useContext, useEffect, useState} from 'react'
import {useCollection, useDocument} from 'react-firebase-hooks/firestore'
import TestList, {isActive} from 'components/TestList'
import DropDown from 'components/dropDown/DropDown'
import Loader from 'components/loader/Loader'
import TestToggler from './components/TestToggler'
import {BoySvg, DropArrowSvg, noUserImg, placeholderImage} from 'constant/icons'
import {APIUrls} from 'constant/api_urls'
import {APITestField, noGroup} from 'constant/api_constants'
import {
  onlyActive,
  IInitialSortList,
  initialSortList,
  myGroup,
  sortAllTests,
  sortByName, navList
} from 'constant/common'
import {FirebaseContextProps, IUserInitialData, IUserSendTest} from 'types/dbTypes'
import {IGetTestList, ITest} from 'types/testsTypes'
import {testListItemModel, usersTestCompleteModel} from 'models/tests'
import {getUserInfo} from 'api'
import {FirebaseContext} from 'index'
import SearchInput from 'components/SearchInput'
import Banners from './components/Banners'

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
  const [searchValue, setSearchValue] = useState<string>('')

  const getTestsList = useCallback(async ({sort = sortAllTests, sortOptions}: IGetTestList): Promise<void> => {
    if (!testListSnapshot) return
    const testList = testListSnapshot.docs.map(item => testListItemModel(item.data()))
    switch (sort) {
      case sortAllTests:
        setUserTestSnapshot(testList)
        break
      case onlyActive:
        setUserTestSnapshot(testList.filter(e => !isActive(e)))
        break
      case myGroup:
        if (!sortOptions) return
        const res = await testListSnapshot.query.where(sortOptions.sortField, sortOptions.sortOp, sortOptions.sortValue).get()
        const testListMyGroup = res.docs.map(item => testListItemModel(item.data()))
        setUserTestSnapshot(testListMyGroup)
        break
      case sortByName:
        setUserTestSnapshot(testList.filter(e => {
          const reg = new RegExp(searchValue, 'gi')
          return e.testName.match(reg) || e.testDescription.match(reg) ? e : false
        }))
        break
      default:
        setUserTestSnapshot(testList || [])
    }
  }, [testListSnapshot, searchValue])

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
    setUserTestComplete(usersTestCompleteModel(userTestComplete))
  }, [userTestCompleteSnapshot, userTestSnapshot])

  useEffect(() => {
    switch (initialSortBy) {
      case sortAllTests:
        getTestsList({}).then()
        break
      case myGroup:
        getTestsList({
          sort: myGroup,
          sortOptions: {sortOp: '==', sortField: APITestField.forGroup, sortValue: userInfo?.group ?? noGroup}
        }).then()
        break
      case onlyActive:
        getTestsList({sort: onlyActive}).then()
        break
      case sortByName:
        getTestsList({sort: sortByName}).then()
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

  const onSearchTest = (e: ChangeEvent<HTMLInputElement>) => {
    setInitialSortBy(sortByName)
    setSearchValue(e.target.value)
  }

  if (!user) return <strong>Ошибка аккаунт не найден!</strong>
  return (
    <div className="home flew-wrapper">
      <div className="left-content">
        <div className="banner home__banner">
          <div className="banner__text">
            <h2 className="banner__title">Hi {user.displayName}</h2>
            <span className="banner-subtitle">Happy passing tests!)</span>
          </div>
          <div className="banner__image">
            <BoySvg/>
          </div>
        </div>
        <div className="test-banner">
          <div className="test-banner__sort">
            <h3>Test list</h3>
            <TestToggler sortList={sortList} onSort={onSort}/>
          </div>
          {testListLoading && <Loader isMini={true}/>}
          {!testListLoading && !userTestSnapshot.length && <strong>No active tests!)</strong>}
          <TestList testList={userTestSnapshot} completeTestIds={userTestComplete?.completeTestId ?? []}/>
        </div>
      </div>
      <div className="right-content">
        <nav>
          <ul className="right-content__navigation">
            <li>
              <SearchInput onChange={onSearchTest}/>
            </li>
            <li className="user-button">
              <DropDown dropList={navList}>
                <div className="user-button__avatar">
                  <img
                    src={user.photoURL ?? noUserImg}
                    alt="user avatar"
                    onError={((e: SyntheticEvent<HTMLImageElement>) => (e.target as HTMLImageElement).src = placeholderImage)}
                  />
                </div>
                <DropArrowSvg className="user-button__icon"/>
              </DropDown>
            </li>
          </ul>
        </nav>
        <div className="banners">
          <Banners test={`${userTestComplete?.completeTest?.length || '0'}`} label={'Tests passed'}/>
          <Banners test={testsLeft} label={'Tests left'}/>
        </div>
      </div>
    </div>
  )
}

export default HomePage
