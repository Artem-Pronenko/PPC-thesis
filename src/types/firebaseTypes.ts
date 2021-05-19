import firebase from 'firebase/app'
import {ITestListItem} from './questionsModalTypes'

export type FirebaseContextProps = {
  firebase: any
  auth: firebase.auth.Auth
  user: firebase.User | null
  db: firebase.firestore.Firestore
}

export interface ITest {
  type: string
  id: string
  answers: ITestListItem[]
}
