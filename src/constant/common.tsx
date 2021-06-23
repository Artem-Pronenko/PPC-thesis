import {IModalTextAnswerValues, IModalOneAnswerValues} from 'types/questionsModalTypes'
import {INavbarList} from 'types/common'
import {HistorySvg, HomeSvg, PersonSvg, StudySvg} from './icons'
import React from 'react'

export const INPUT_ANSWER = 'INPUT_ANSWER'
export const INPUT_QUESTION = 'INPUT_QUESTION'

export const ERROR_CREATE_TEST = 'Error while creating a test'

export const questionType = {
  ONE_ANSWER: 'ONE_ANSWER',
  YES_OR_NO_ANSWER: 'YES_OR_NO_ANSWER',
  TEXT_ANSWER: 'TEXT_ANSWER',
  FEW_ANSWER: 'FEW_ANSWER'
}

export const modalOneAnswerInitialValues: IModalOneAnswerValues = {
  questionInputName: 'Multiple answer question',
  inputVariantName: 'Answer',
  radioButtonDoneValue: 'done',
}

export const modalTestAnswerInitialValues: IModalTextAnswerValues = {
  questionInputName: 'Question with text answer',
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
    text: 'Home'
  },
  {
    path: '/study',
    icon: <StudySvg/>,
    text: 'Create test'
  },
  {
    path: '/profile',
    icon: <PersonSvg/>,
    text: 'Profile'
  },
  {
    path: '/history',
    icon: <HistorySvg/>,
    text: 'History'
  },
]
export const sortAllTests: string = 'allTests'
export const myGroup: string = 'myGroup'
export const onlyActive: string = 'onlyActive'
export const sortByName: string = 'sortByName'

export const initialSortList: IInitialSortList = [
  {
    text: 'All tests',
    active: true,
    id: sortAllTests
  },
  {
    text: 'My group',
    active: false,
    id: myGroup
  },
  {
    text: 'You can still pass',
    active: false,
    id: onlyActive
  }
]
