import firebase from 'firebase/app'
import {ITestListItem} from './questionsModalTypes'
import DocumentReference = firebase.firestore.DocumentReference
import DocumentData = firebase.firestore.DocumentData

export type FirebaseContextProps = {
  firebase: any
  auth: firebase.auth.Auth
  user: firebase.User | null
  db: firebase.firestore.Firestore
}

export interface ITest {
  type: string
  id?: string
  idDoc: string
  answers: ITestListItem[]
  testName: string
  testEndDate: string
  testDescription: string
}

interface ITestAnswer {
  idAnswer: string
  answer: string
}

export interface ITestListAnswer {
  idDoc: string
  answers: ITestAnswer[]
}


export {DocumentReference}
export type {DocumentData}
