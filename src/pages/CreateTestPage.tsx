import React, {FC, useEffect, useState} from 'react'
import {RouteProps} from '../types/routeTypes'
import Modal from '../components/Modal'


const CreateTestPage: FC<RouteProps> = ({match}) => {
  const slug: string = match.params.slug
  const [activeModal, setActiveModal] = useState<boolean>(false)

  useEffect(() => {
    console.log(slug)
  }, [])


  if (slug === 'multi') return (
    <div>
      <h3>Создание {slug} теста</h3>
      <div className="flew-wrapper">
        <div className="left-content">
          <Modal active={activeModal} setActive={setActiveModal}>
            <div>

            </div>
          </Modal>
        </div>
        <div className="right-content create-test-bar">
          <button onClick={() => setActiveModal(true)} className="rainbow create-test__button">Вопрос с 1 правильным ответом</button>
          <button onClick={() => setActiveModal(true)} className="rainbow create-test__button">Вопрос с текстовым ответом</button>
          <button onClick={() => setActiveModal(true)} className="rainbow create-test__button">Вопрос с несколькими ответами</button>
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
