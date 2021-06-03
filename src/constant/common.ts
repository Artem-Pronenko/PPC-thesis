import {IOneModalAnswerInitialValues} from 'types/questionsModalTypes'
import {userProfilePageId} from '../pages/UserProfilePage';

export const INPUT_ANSWER = 'INPUT_ANSWER'
export const INPUT_QUESTION = 'INPUT_QUESTION'

export const ERROR_CREATE_TEST = 'Ошибка при создании теста'

export const questionType = {
  ONE_ANSWER: 'ONE_ANSWER',
  YES_OR_NO_ANSWER: 'YES_OR_NO_ANSWER',
}

export const oneModalAnswerInitialValues: IOneModalAnswerInitialValues = {
  questionInputName: 'Вопрос с несколькими ответами',
  inputVariantName: 'Ответ',
  radioButtonDoneValue: 'done',
}

export const yerDeclOfNum = ['год', 'года', 'лет']
export const monthDeclOfNum = ['месяц', 'месяца', 'месяцев']
export const dayDeclOfNum = ['день', 'дня', 'дней']
export const hourDeclOfNum = ['час', 'часа', 'часов']
export const minutesDeclOfNum = ['минута', 'минуты', 'минут']

export type IInitialSortList = Array<{ text: string, active: boolean, id: string }>

export const dropList = [
  {
    text: 'Мой профиль',
    path: `/${userProfilePageId}`,
  },
  {
    text: 'Что-то еще',
    path: '/',
  },
]
export const sortAllTests: string = 'allTests'
export const myGroup: string = 'myGroup'
export const onlyActive: string = 'onlyActive'
export const sortByName: string = 'sortByName'

export const initialSortList: IInitialSortList = [
  {
    text: 'Все тесты',
    active: true,
    id: sortAllTests
  },
  {
    text: 'Моя группа',
    active: false,
    id: myGroup
  },
  {
    text: 'Еще можно сдать',
    active: false,
    id: onlyActive
  }
]
