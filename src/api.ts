import {DocumentData, IUserAnswer, IUserCompleteTest, IUserInitialData} from 'types/dbTypes'
import firebase from 'firebase/app'
import 'firebase/auth'

const auth = firebase.auth()

export const authUser = async (): Promise<firebase.auth.UserCredential | void> => {
  try {
    return await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  } catch (e) {
    console.log(e)
  }
}

export const getOldUser = (uid: string): Promise<DocumentData> | undefined => {
  try {
    return firebase.firestore().collection('users').doc(uid).get()
  } catch (e) {
    console.error(e)
  }
}

export const setUsersData = async (uid: string, body: IUserInitialData): Promise<void> => {
  try {
    return firebase.firestore().collection('users').doc(uid).set(body)
  } catch (e) {
    console.error(e)
  }
}

export const signOutUser = () => {
  return auth.signOut()
}

interface IOnSendTest {
  responseTestId: string
  urlTest: string
  urlTestComplete: string
  answers: Array<IUserAnswer>
}

export const onSendTest = async ({responseTestId, urlTest, urlTestComplete, answers}: IOnSendTest) => {
  const completeTest: IUserCompleteTest = {
    testId: responseTestId,
    answers: answers
  }

  const body = {
    completeTestId: firebase.firestore.FieldValue.arrayUnion(responseTestId),
    completeTest: firebase.firestore.FieldValue.arrayUnion(completeTest)
  }

  try {
    const uid = firebase.auth().currentUser!.uid
    const setUsersTestSnapshot = firebase.firestore().collection(urlTest).doc(uid)
    const setUsersSettingsSnapshot = firebase.firestore().collection(urlTestComplete).doc(uid)

    await setUsersTestSnapshot.set(
      {...body, idDoc: uid}, {merge: true}
    )

    await setUsersSettingsSnapshot.set(
      {completeTestId: firebase.firestore.FieldValue.arrayUnion(responseTestId), idDoc: uid},
      {merge: true}
    )

  } catch (e) {
    console.log(e)
  }

}

export const getUserInfo = async (uid: string): Promise<firebase.firestore.DocumentSnapshot | void> => {
  try {
    return await firebase.firestore().collection('users').doc(uid).get()
  } catch (e) {
    console.log(e)
  }
}

