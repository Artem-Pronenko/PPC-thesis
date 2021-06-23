import React, {ChangeEvent, Dispatch, FC, FormEvent, useContext, useEffect, useState} from 'react'
import SelectInput from 'components/SelectInput'
import {useDocument} from 'react-firebase-hooks/firestore'
import {FirebaseContext} from 'index'
import {TGroups} from 'types/dbTypes'
import {getUserInfo} from 'api'
import FloatingInput from 'components/floatingInput/FloatingInput'
import {uid} from 'uid'
import {APIUrls} from 'constant/api_urls'

interface SettingsModalProps {
  setTestName: Dispatch<string>
  testName: string
  testDescription: string
  setTestDescription: Dispatch<string>
  testEndDate: string
  setTestEndDate: Dispatch<string>
  setChoseGroups: Dispatch<string>
  onCreateTest: () => void
  isShowButton: boolean
  setIsActiveOnExpiration: Dispatch<boolean>
  isActiveOnExpiration: boolean
}

const SettingsModal: FC<SettingsModalProps> = ({
                                                 setTestName,
                                                 testName,
                                                 testDescription,
                                                 setTestDescription,
                                                 testEndDate,
                                                 setTestEndDate,
                                                 setChoseGroups,
                                                 onCreateTest,
                                                 isShowButton,
                                                 setIsActiveOnExpiration,
                                                 isActiveOnExpiration
                                               }) => {
  const {user, db} = useContext(FirebaseContext)
  const [groups, setGroups] = useState<TGroups>([])
  const [userGroup, setUserGroup] = useState<string>('')
  const [groupsSnapshot] = useDocument(db.collection(APIUrls.groups).doc(APIUrls.groups))
  const activeOnExpiration = {
    values: ['Да', 'Нет'],
    initialValue: isActiveOnExpiration ? 'Да' : 'Нет'
  }

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

  const handleCreateTest = (e: FormEvent) => {
    e.preventDefault()
    onCreateTest()
  }

  return (
    <div>
      <h3>Test settings</h3>
      <br/>
      <FloatingInput
        name={'Test name'}
        placeholder={'Give a test name'}
        id={uid()}
        onChange={e => setTestName(e.target.value)}
        value={testName}
      />
      <br/>
      <br/>
      <FloatingInput
        name={'Test description'}
        placeholder={'Give a description of the test'}
        id={uid()}
        onChange={e => setTestDescription(e.target.value)}
        value={testDescription}
      />
      <br/>
      <br/>
      <label className="create-test__date-label">
        <span>
          <span className="create-test__date-icon">&#9760;</span>
        You need to take the test before:
        </span>
        <input
          type="datetime-local"
          className="create-test__date"
          value={testEndDate}
          onChange={e => setTestEndDate(e.target.value)}
        />
      </label>
      <br/>
      <SelectInput
        selectItem={activeOnExpiration.initialValue}
        items={activeOnExpiration.values}
        isFullWidth={true}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setIsActiveOnExpiration(e.target.value === 'Да')
        }}
        label={'Allow passage after the specified date?'}
      />
      <br/>
      <SelectInput
        selectItem={userGroup}
        items={groups}
        isFullWidth={true}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setChoseGroups(e.target.value)
        }}
        label={'Test for group:'}
      />
      <br/>
      {isShowButton
        ? <button onClick={handleCreateTest}>Create!</button>
        : <strong>Add at least 1 question to create a test</strong>}
    </div>
  )
}

export default SettingsModal
