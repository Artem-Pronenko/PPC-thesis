import firebase from 'firebase'
import {IUserAnswer} from './dbTypes'

export interface IGetTestList {
  sort?: string,
  sortOptions?: {
    sortField: string
    sortOp: firebase.firestore.WhereFilterOp
    sortValue: string
  }
}

export type ITestMinInfo = Array<{ testName: string, testId: string }>

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
  forGroup: string
  whoCreated: string
  testName: string
  testEndDate: string
  testDescription: string
  isActiveOnExpiration: boolean
}

interface ITestAnswer {
  question: string
  correctAnswer: string
}

export interface ITestListAnswer {
  idDoc: string
  answers: ITestAnswer[]
}

export interface ITestView {
  idDoc: string
  testName: string
  currentTest: ITest
  userAnswers: IUserAnswer[]
  correctAnswers: ITestListAnswer
}
