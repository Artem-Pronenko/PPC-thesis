import React, {ChangeEvent, FC, FormEvent} from 'react'

interface SearchInputProps {
  placeholder?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit?: (e: FormEvent) => void
}

const SearchInput: FC<SearchInputProps> = ({placeholder = 'Название теста...', onChange, onSubmit}) => {
  return (
    <form role="search" className="search-form" onSubmit={(e: FormEvent)=> {
      e.preventDefault()
      onSubmit && onSubmit(e)
    }}>
      <input className="search-input" type="search" placeholder={placeholder} required onChange={onChange}/>
      <button className="search-form-button" type="submit">Go!</button>
    </form>
  )
}

export default SearchInput
