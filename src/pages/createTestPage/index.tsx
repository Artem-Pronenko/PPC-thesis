import React, {FC, useState} from 'react'
import {RouteProps} from 'types/routeTypes'
import Modal from 'components/Modal'
import {Modal2, Modal3} from 'components/QuestionModalContent'
import QuestionModalOneAnswer from './components/QuestionModalOneAnswer'
import QuestionModalYerOrNo from './components/QuestionModalYerOrNo'


const CreateTestPage: FC<RouteProps> = ({match}) => {
  const slug: string = match.params.slug
  const [activeModal, setActiveModal] = useState<boolean>(false)
  const [modalContentId, setModalContentId] = useState<number>(0)

  const modalContent = [
    {
      id: 0,
      content: QuestionModalOneAnswer()
    },
    {
      id: 1,
      content: Modal2()
    },
    {
      id: 2,
      content: Modal3(),
    },
    {
      id: 3,
      content: QuestionModalYerOrNo()
    }
  ]

  const showModal = (id: number) => {
    setActiveModal(true)
    setModalContentId(id)
  }

  if (slug === 'multi') return (
    <div>
      <h3>Создание {slug} теста</h3>
      <div className="flew-wrapper">
        <div className="left-content">
          <Modal active={activeModal} setActive={setActiveModal}>
            {modalContent.filter(e => e.id === modalContentId)[0]?.content}
          </Modal>
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
