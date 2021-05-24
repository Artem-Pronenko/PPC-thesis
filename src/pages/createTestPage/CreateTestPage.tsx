import React, {FC, FormEvent, useState} from 'react'
import Modal from 'components/Modal'
import {RouteProps} from 'types/routeTypes'
import {ITest, ITestListAnswer, ITestListItem} from 'types/dbTypes'
import {Modal2, Modal3} from 'components/QuestionModalContent'
import QuestionModalOneAnswer from './components/QuestionModalOneAnswer'
import QuestionModalYesOrNo from './components/QuestionModalYesOrNo'
import Loader from 'components/loader/Loader'
import TestPreview from './components/TestPreview'
import useFirestoreSet from 'hooks/useFirestoreSet'
import {ERROR_CREATE_TEST} from 'constant/common'
import {createIdCollection} from 'utiles'


const CreateTestPage: FC<RouteProps> = ({match}) => {
  const slug: string = match.params.slug
  const [activeModal, setActiveModal] = useState<boolean>(false)
  const [modalContentId, setModalContentId] = useState<number>(0)
  const [testName, setTestName] = useState<string>('')
  const [testDescription, setTestDescription] = useState<string>('')
  const [testEndDate, setTestEndDate] = useState<string>('')
  const [questionList, setQuestionList] = useState<Array<ITestListItem>>([])
  const {isLoading: isLoadingTest, setDB: setTest, error} = useFirestoreSet('tests')
  const {setDB: setTestAnswer} = useFirestoreSet('testsAnswer')

  const modalContent = [
    {
      id: 0,
      content: <QuestionModalOneAnswer setTestList={setQuestionList}/>
    },
    {
      id: 1,
      content: <Modal2/>
    },
    {
      id: 2,
      content: <Modal3/>,
    },
    {
      id: 3,
      content: <QuestionModalYesOrNo setTestList={setQuestionList}/>
    }
  ]

  const showModal = (id: number) => {
    setActiveModal(true)
    setModalContentId(id)
  }

  const deleteQuestion = (id: string) => {
    setQuestionList(prevState => {
      return [...prevState.filter(el => el.id !== id)]
    })
  }

  const createTest = async (e: FormEvent) => {
    e.preventDefault()

    const idDoc = createIdCollection('tests')

    const initialDataTest: ITest = {
      idDoc: idDoc,
      type: slug,
      questions: [],
      testName,
      testEndDate,
      testDescription
    }
    const initialDataAnswer: ITestListAnswer = {
      idDoc: idDoc,
      answers: []
    }

    questionList.forEach(question => {

      initialDataAnswer.answers.push({
        question: question.id,
        correctAnswer: question.answer!
      })

      initialDataTest.questions.push({
        type: question.type,
        answerOptions: question.answerOptions,
        id: question.id,
        question: question.question
      })
    })

    setTest({
      body: initialDataTest,
      idDoc: idDoc
    })

    setTestAnswer({
      body: initialDataAnswer,
      idDoc: idDoc
    })
    setQuestionList([])
  }

  if (slug === 'multi') return (
    <div>
      <h3>Создание {slug} теста</h3>
      <div className="create-test-page flew-wrapper">
        <Modal active={activeModal} setActive={setActiveModal}>
          {modalContent.filter(e => e.id === modalContentId)[0]?.content}
        </Modal>
        <div className="left-content">
          {!questionList.length && <h4>Начните создавать тест</h4>}
          {questionList.length > 0 && (
            <TestPreview
              testList={questionList}
              deleteTest={deleteQuestion}
              createTest={createTest}
              setTestName={setTestName}
              testName={testName}
              setTestDescription={setTestDescription}
              testDescription={testDescription}
              testEndDate={testEndDate}
              setTestEndDate={setTestEndDate}
            />
          )}
          {isLoadingTest && <Loader/>}
          {error && <strong className="error">{ERROR_CREATE_TEST}: {error?.message}</strong>}
        </div>
        <div className="right-content create-test-bar">
          <button onClick={() => showModal(0)} className="rainbow create-test__button">Вопрос с 1 правильным
            ответом
          </button>
          <button onClick={() => showModal(1)} className="rainbow create-test__button">Вопрос с текстовым
            ответом
          </button>
          <button onClick={() => showModal(2)} className="rainbow create-test__button">Вопрос с несколькими
            ответами
          </button>
          <button onClick={() => showModal(3)} className="rainbow create-test__button">Вопрос да/нет</button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <h3>Создание {slug} теста</h3>

      <form>

      </form>
    </div>
  )
}

export default CreateTestPage
