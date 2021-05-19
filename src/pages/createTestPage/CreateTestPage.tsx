import React, {FC, FormEvent, useContext, useState} from 'react'
import Modal from 'components/Modal'
import {RouteProps} from 'types/routeTypes'
import {ITest} from 'types/firebaseTypes'
import {Modal2, Modal3} from 'components/QuestionModalContent'
import QuestionModalOneAnswer from './components/QuestionModalOneAnswer'
import QuestionModalYerOrNo from './components/QuestionModalYerOrNo'
import {ITestListItem} from 'types/questionsModalTypes'
import TestPreview from './components/TestPreview'
import {FirebaseContext} from 'index'


const CreateTestPage: FC<RouteProps> = ({match}) => {
  const slug: string = match.params.slug
  const [activeModal, setActiveModal] = useState<boolean>(false)
  const [modalContentId, setModalContentId] = useState<number>(0)
  const [testList, setTestList] = useState<Array<ITestListItem>>([])
  const {db} = useContext(FirebaseContext)

  const modalContent = [
    {
      id: 0,
      content: <QuestionModalOneAnswer setTestList={setTestList}/>
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
      content: <QuestionModalYerOrNo setTestList={setTestList}/>
    }
  ]

  const showModal = (id: number) => {
    setActiveModal(true)
    setModalContentId(id)
  }

  const deleteTest = (id: string) => {
    setTestList(prevState => {
      return [...prevState.filter(el => el.id !== id)]
    })
  }

  const createTest = async (e: FormEvent) => {
    e.preventDefault()

    const initialData: ITest = {
      type: slug,
      id: '',
      answers: []
    }

    initialData.id = '-1'

    testList.map(item => {
      initialData.answers.push(item)
    })

    const query = db.collection('test').doc()
    await query.set(initialData)
  }

  if (slug === 'multi') return (
    <div>
      <h3>Создание {slug} теста</h3>
      <div className="create-test-page flew-wrapper">
        <Modal active={activeModal} setActive={setActiveModal}>
          {modalContent.filter(e => e.id === modalContentId)[0]?.content}
        </Modal>
        <div className="left-content">
          {!testList.length && <h4>Начните создавать тест</h4>}
          {testList.length > 0 && (
            <TestPreview testList={testList} deleteTest={deleteTest} createTest={createTest}/>
          )}
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
