import firebase from 'firebase/app'
import DocumentData = firebase.firestore.DocumentData

export type FirebaseContextProps = {
  firebase: any
  auth: firebase.auth.Auth
  user: firebase.User | null
  db: firebase.firestore.Firestore
}

export interface IUserAnswer {
  answerId: string
  questionId: string
}

export interface IUserCompleteTest {
  testId: string
  answers: Array<IUserAnswer>
}

export interface IUserSendTest {
  completeTestId: Array<string>
  completeTest: IUserCompleteTest[]
}

export interface IUserInitialData {
  displayName: string
  idDoc: string
  group: string
  photoURL: string
  completeTestId: Array<string>
}

export type TGroups = Array<string>

export type {DocumentData}
