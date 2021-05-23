import {IOneModalAnswerInitialValues} from 'types/questionsModalTypes'

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
