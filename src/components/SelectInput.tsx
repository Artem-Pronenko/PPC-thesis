import React, {ChangeEvent, FC} from 'react'

interface SelectInputProps {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  selectItem: string
  items: Array<string>
  label?: string
  isFullWidth?: boolean
}

const SelectInput: FC<SelectInputProps> = ({
                                             onChange,
                                             selectItem,
                                             items,
                                             label = 'Select a group:',
                                             isFullWidth
                                           }) => {
  return (
    <div style={isFullWidth ? {justifyContent: 'space-between', display: 'flex'} : {}}>
      <label htmlFor="select-group" className="user-profile__select-label">{label}</label>
      <select id="select-group" onChange={(e) => {
        onChange(e)
      }}>
        <option value="user_group" hidden>{selectItem}</option>
        {items?.map(e => (
          <option key={`${e}`} value={e}>{e}</option>
        ))}
      </select>
    </div>
  )
}

export default SelectInput
