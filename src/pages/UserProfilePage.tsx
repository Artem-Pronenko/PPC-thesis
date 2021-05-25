import React, {useContext, useEffect, useState} from 'react'
import {FirebaseContext} from 'index'
import {noUserImg} from 'constant/icons'
import {useDocument} from 'react-firebase-hooks/firestore'
import {TGroups} from 'types/dbTypes'

const UserProfilePage = () => {
  const {user, db} = useContext(FirebaseContext)
  const [isEditProfile, setIsEditProfile] = useState<boolean>(false)
  const [groups, setGroups] = useState<TGroups>()
  const [groupsSnapshot, loadingGroups] = useDocument(db.collection('groups').doc('groups'))


  useEffect(() => {
    const groupsData = groupsSnapshot?.data()
    if (!groupsData) return
    setGroups(groupsData?.allGroups)


  }, [groupsSnapshot])

  const onSaveChange = () => {
    setIsEditProfile(false)

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
      <div className="user-profile__settings">
        <label htmlFor="select-group" className="user-profile__select-label">Выбрать группу:</label>
        <select id="select-group" onChange={onChange} defaultValue='no_group'>
          <option value="no_group" hidden>Выбрать группу</option>
          {groups?.map((e, index) => (
            <option key={`${e}${index}`} value={e}>{e}</option>
          ))}
        </select>
      </div>
      {isEditProfile && <button onClick={onSaveChange} type="submit">Сохранить</button>}
    </section>
  )
}

export default UserProfilePage
