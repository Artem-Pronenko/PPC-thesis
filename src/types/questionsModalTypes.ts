export interface IOneModalAnswerInitialValues {
  questionInputName: string
  inputVariantName: string
  radioButtonDoneValue: string
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
