import { useEffect, useRef, useState } from 'react'
import { InputGroup, Form } from 'react-bootstrap'
import { LuSearch } from 'react-icons/lu'

export default function SearchBar({ placeholder = 'Search…', onSearch, delay = 400 }) {
  const [value, setValue] = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => onSearch(value.trim()), delay)
    return () => clearTimeout(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <InputGroup>
      <InputGroup.Text style={{ background: '#fff' }}>
        <LuSearch size={16} />
      </InputGroup.Text>
      <Form.Control
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </InputGroup>
  )
}
