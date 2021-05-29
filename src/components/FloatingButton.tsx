import React, {FC, ReactNode} from 'react'

interface FloatingButtonProps {
  children: ReactNode
  onClick: () => void
}

const FloatingButton: FC<FloatingButtonProps> = ({children, onClick}) => {
  return (
    <button className="floating-button" onClick={onClick}>
      {children}
    </button>
  )
}

export default FloatingButton
