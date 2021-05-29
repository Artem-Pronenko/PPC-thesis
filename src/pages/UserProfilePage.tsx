import React, {ChangeEvent, useContext, useEffect, useState} from 'react'
import {FirebaseContext} from 'index'
import {noUserImg} from 'constant/icons'
import {useDocument} from 'react-firebase-hooks/firestore'
import {TGroups} from 'types/dbTypes'
import useFirestoreSet from 'hooks/useFirestoreSet'
import Loader from 'components/loader/Loader'
import {getUserInfo} from 'api'
import SelectInput from 'components/SelectInput'
import {APIUrls} from 'constant/api_urls'

export const userProfilePageId: string = 'profile'
const UserProfilePage = () => {
  const {user, db} = useContext(FirebaseContext)
  const [isEditProfile, setIsEditProfile] = useState<boolean>(false)
  const [groups, setGroups] = useState<TGroups>([])
  const [choseGroups, setChoseGroups] = useState<string>('')
  const [userGroup, setUserGroup] = useState<string>('')
  const [groupsSnapshot, loadingGroups] = useDocument(db.collection(APIUrls.groups).doc(APIUrls.groups))
  const {setDB} = useFirestoreSet(APIUrls.users)

  useEffect(() => {
    const groupsData = groupsSnapshot?.data()
    if (!groupsData) return
    setGroups(groupsData?.allGroups)
  }, [groupsSnapshot])

  useEffect(() => {
    (async () => {
      if (!user) return
      const userData = await getUserInfo(user.uid)
      if (!userData) return
      const userInfo = userData.data()
      setUserGroup(userInfo?.group)
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
          <img src={user?.photoURL ?? noUserImg} alt="user"/>
        </div>
        <strong className="user-profile__user-name">{user?.displayName}</strong>
      </div>
      <hr/>
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
