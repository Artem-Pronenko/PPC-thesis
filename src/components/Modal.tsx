import React, {Dispatch, FC, SetStateAction} from 'react'

interface ModalProps {
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>
}

const Modal: FC<ModalProps> = ({active, setActive, children}) => {

  return (
    <div className={active ? 'modal active': 'modal'} onClick={() => setActive(false)}>
      <div className={active ? 'modal__content active': 'modal__content'} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
