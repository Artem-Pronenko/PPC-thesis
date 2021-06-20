import {IModalTextAnswerValues, IModalOneAnswerValues} from 'types/questionsModalTypes'
import {INavbarList} from 'types/common'
import {HistorySvg, HomeSvg, PersonSvg, StudySvg} from './icons'
import React from 'react'

export const INPUT_ANSWER = 'INPUT_ANSWER'
export const INPUT_QUESTION = 'INPUT_QUESTION'

export const ERROR_CREATE_TEST = 'Ошибка при создании теста'

export const questionType = {
  ONE_ANSWER: 'ONE_ANSWER',
  YES_OR_NO_ANSWER: 'YES_OR_NO_ANSWER',
  TEXT_ANSWER: 'TEXT_ANSWER'
}

export const modalOneAnswerInitialValues: IModalOneAnswerValues = {
  questionInputName: 'Вопрос с несколькими ответами',
  inputVariantName: 'Ответ',
  radioButtonDoneValue: 'done',
}

export const modalTestAnswerInitialValues: IModalTextAnswerValues = {
  questionInputName: 'Вопрос с текстовым ответом',
}

export const yerDeclOfNum = ['год', 'года', 'лет']
export const monthDeclOfNum = ['месяц', 'месяца', 'месяцев']
export const dayDeclOfNum = ['день', 'дня', 'дней']
export const hourDeclOfNum = ['час', 'часа', 'часов']
export const minutesDeclOfNum = ['минута', 'минуты', 'минут']

export type IInitialSortList = Array<{ text: string, active: boolean, id: string }>

export const navList: INavbarList[] = [
  {
    path: '/',
    icon: <HomeSvg/>,
    text: 'Домой'
  },
  {
    path: '/study',
    icon: <StudySvg/>,
    text: 'Создать тест'
  },
  {
    path: '/profile',
    icon: <PersonSvg/>,
    text: 'Мой профиль'
  },
  {
    path: '/history',
    icon: <HistorySvg/>,
    text: 'История'
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
