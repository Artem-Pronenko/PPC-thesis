import React, {FC} from 'react'

interface TestTogglerProps {
  sortList: {
    text: string
    active: boolean
    id: string
  }[]
  onSort: (itemId: string) => void
}

const TestToggler: FC<TestTogglerProps> = ({sortList, onSort}) => {
  return (
    <ul className="test-banner__sort-list">
      {sortList.map(item => (
        <li
          onClick={() => onSort(item.id)}
          key={item.id}
          className={`test-banner__sort-item ${item.active ? 'active' : ''}`}>
          {item.text}
        </li>
      ))}
    </ul>
  )
}

export default TestToggler
