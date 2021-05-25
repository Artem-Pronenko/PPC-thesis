import firebase from 'firebase/app'
import {DocumentData, IUserInitialData} from './types/dbTypes'
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

