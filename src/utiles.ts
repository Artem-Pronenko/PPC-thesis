import firebase from 'firebase/app'
import {IUserAnswer} from 'types/dbTypes'

export const createIdCollection = (collection: string) => {
  return firebase.firestore().collection(collection).doc().id
}

interface IIsCheckedAnswer {
  currentAnswerId: string,
  currentQuestionId: string,
  userAnswers: IUserAnswer[] | null
}

export const IsCheckedAnswer = ({currentAnswerId, currentQuestionId, userAnswers}: IIsCheckedAnswer): boolean => {
  let isChecked: boolean = false
  userAnswers?.forEach(e => {
    if (e.questionId === currentQuestionId)
      isChecked = currentAnswerId === e.answerId
  })
  return isChecked
}

export const declOfNum = (number: number, titles: Array<string>) => {
  if (!number) return ''
  const cases = [2, 0, 1, 1, 1, 2]
  return `${number} ${titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]}`
}
