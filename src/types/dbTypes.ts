import firebase from 'firebase/app'
import DocumentReference = firebase.firestore.DocumentReference
import DocumentData = firebase.firestore.DocumentData

export type FirebaseContextProps = {
  firebase: any
  auth: firebase.auth.Auth
  user: firebase.User | null
  db: firebase.firestore.Firestore
}

export interface IAnswerOptions {
  answerText: string
  id: string
}

export interface ITestListItem {
  id: string
  question: string
  type: string
  answerOptions: Array<IAnswerOptions>
  answer?: string
}

export interface ITest {
  type: string
  id?: string
  idDoc: string
  questions: ITestListItem[]
  testName: string
  testEndDate: string
  testDescription: string
}

interface ITestAnswer {
  question: string
  correctAnswer: string
}

export interface ITestListAnswer {
  idDoc: string
  answers: ITestAnswer[]
}

interface IUserAnswer {
  answerId: string
  questionId: string
}

interface IUserCompleteTest {
  testId: string,
  answers: Array<IUserAnswer>
}

export interface IUserSendTest {
  completeTestId: firebase.firestore.FieldValue,
  completeTest: IUserCompleteTest[]
}


export {DocumentReference}
export type {DocumentData}
