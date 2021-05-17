import {IOneModalAnswerInitialValues} from '../types/questionsModalTypes';

export const INPUT_ANSWER = 'INPUT_ANSWER'

export const questionType = {
  ONE_MODAL_ANSWER: 'ONE_MODAL_ANSWER',
}

export const oneModalAnswerInitialValues: IOneModalAnswerInitialValues = {
  questionInputName: 'Вопрос с несколькими ответами',
  inputVariantName: 'Ответ',
  radioButtonDoneValue: 'done',
}
