import React, {ChangeEvent, FC} from 'react'

interface SearchInputProps {
  placeholder?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchInput: FC<SearchInputProps> = ({placeholder = 'Название теста...', onChange}) => {
  return (
    <form role="search" className="search-form">
      <input className="search-input" type="search" placeholder={placeholder} required onChange={onChange}/>
      <button className="search-form-button" type="submit">Go!</button>
    </form>
  )
}

export default SearchInput
