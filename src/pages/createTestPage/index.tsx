import React, {FC, useState} from 'react'
import {RouteProps} from 'types/routeTypes'
import Modal from 'components/Modal'
import {Modal2, Modal3} from 'components/QuestionModalContent'
import QuestionModalOneAnswer from './components/QuestionModalOneAnswer'
import QuestionModalYerOrNo from './components/QuestionModalYerOrNo'
import {ITestListItem} from 'types/questionsModalTypes'


const CreateTestPage: FC<RouteProps> = ({match}) => {
  const slug: string = match.params.slug
  const [activeModal, setActiveModal] = useState<boolean>(false)
  const [modalContentId, setModalContentId] = useState<number>(0)
  const [testList, setTestList] = useState<Array<ITestListItem>>([])

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
      content: <QuestionModalYerOrNo/>
    }
  ]

  const showModal = (id: number) => {
    setActiveModal(true)
    setModalContentId(id)
  }

  if (slug === 'multi') return (
    <div>
      <h3>Создание {slug} теста</h3>
      <div className="create-test-page flew-wrapper">
        <Modal active={activeModal} setActive={setActiveModal}>
          {modalContent.filter(e => e.id === modalContentId)[0]?.content}
        </Modal>
        <div className="left-content">
          {testList.map(el => (
            <div key={el.question} className="question-card test-card question-card__mb">
              <button className="question-card__delete delete">&#10007;</button>
              <h3 className="question-card__title">{el.question}</h3>
              <span className="question-card__subtitle">Варианрты ответа</span>
              <hr className="question-card__hr"/>
              <ul className="question-card__answers">
                {el.answerOptions.map(item => (
                  <li
                    key={item.id}
                    className="question-card__answers-item"
                  >{item.answerText} {item.id === el.answer && <span>&#10004;</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
