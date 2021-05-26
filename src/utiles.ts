import firebase from 'firebase/app'
import {IUserAnswer} from 'types/dbTypes'

export const createIdCollection = (collection: string) => {
  return firebase.firestore().collection(collection).doc().id
}

interface IIsCheckedAnswer {
  currentAnswerId: string,
  currentQuestionId: string,
  userAnswer: IUserAnswer[] | null
}

export const IsCheckedAnswer = ({currentAnswerId, currentQuestionId, userAnswer}: IIsCheckedAnswer): boolean => {
  let isChecked: boolean = false
  userAnswer?.forEach(e => {
    if (e.questionId === currentQuestionId)
      isChecked = currentAnswerId === e.answerId
  })
  return isChecked
}
