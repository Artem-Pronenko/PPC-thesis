import React, {ChangeEvent, SyntheticEvent, useCallback, useContext, useEffect, useState} from 'react'
import {FirebaseContext} from 'index'
import {noUserImg, placeholderImage} from 'constant/icons'
import {useCollection, useDocument} from 'react-firebase-hooks/firestore'
import {TGroups} from 'types/dbTypes'
import useFirestoreSet from 'hooks/useFirestoreSet'
import Loader from 'components/loader/Loader'
import {getUserInfo} from 'api'
import SelectInput from 'components/SelectInput'
import {APIUrls} from 'constant/api_urls'
import TestList from 'components/TestList'
import {ITest} from 'types/testsTypes'
import {testListItemModel} from 'models/tests'
import {myTestPageId} from './myTestPage/MyTestPage'

export const userProfilePageId: string = 'profile'
const UserProfilePage = () => {
  const {user, db} = useContext(FirebaseContext)
  const [isEditProfile, setIsEditProfile] = useState<boolean>(false)
  const [groups, setGroups] = useState<TGroups>([])
  const [choseGroups, setChoseGroups] = useState<string>('')
  const [userGroup, setUserGroup] = useState<string>('')
  const [groupsSnapshot, loadingGroups] = useDocument(db.collection(APIUrls.groups).doc(APIUrls.groups))
  const {setDB} = useFirestoreSet(APIUrls.users)
  const [userTestSnapshot, setUserTestSnapshot] = useState<ITest[]>([])
  const [testListSnapshot, testListLoading] = useCollection(db.collection(APIUrls.tests))

  const getTestsList = useCallback(async (): Promise<void> => {
    if (!testListSnapshot || !user) return
    const res = await testListSnapshot.query.where('whoCreated', '==', user.uid).get()
    const testList = res.docs.map(item => testListItemModel(item.data()))
    setUserTestSnapshot(testList)
  }, [testListSnapshot, user])

  useEffect(() => {
    getTestsList().then()
  }, [getTestsList])

  useEffect(() => {
    const groupsData = groupsSnapshot?.data()
    if (!groupsData) return
    setGroups(groupsData?.allGroups)
  }, [groupsSnapshot])

  useEffect(() => {
    (async () => {
      if (!user) return
      const userInfo = await getUserInfo(user.uid)
      if (!userInfo) return
      setUserGroup(userInfo.group)
    })()

  }, [user])

  const onSaveChange = () => {
    setIsEditProfile(false)
    setDB({
      body: {group: choseGroups},
      idDoc: user!.uid,
      isMerge: true
    })
  }

  const onChange = () => {
    setIsEditProfile(true)
  }

  return (
    <section className="user-profile center-page">
      <div className="user-profile__head">
        <div className="user-profile__img">
          <img
            src={user?.photoURL ?? noUserImg}
            alt="user"
            onError={((e: SyntheticEvent<HTMLImageElement>) => (e.target as HTMLImageElement).src = placeholderImage)}
          />
        </div>
        <strong className="user-profile__user-name">{user?.displayName}</strong>
      </div>
      <hr/>
      <h3>Мои тесты</h3>
      {testListLoading && <Loader isMini={true}/>}
      {!testListLoading && userTestSnapshot.length === 0 && <span>У вас нет активных тестов</span>}
      <TestList
        testList={userTestSnapshot}
        completeTestIds={[]}
        buttonTest={'Проверить'}
        isBlocked={false}
        link={myTestPageId}
      />
      <hr/>
      <h3>Настройки</h3>
      {loadingGroups ?
        <Loader isMini={true}/>
        : (
          <div className="user-profile__settings">
            <SelectInput
              selectItem={userGroup}
              items={groups}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                onChange()
                setChoseGroups(e.target.value)
              }}
            />
          </div>
        )}
      {isEditProfile && <button onClick={onSaveChange} type="submit">Сохранить</button>}
    </section>
  )
}

export default UserProfilePage
