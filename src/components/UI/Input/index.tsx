import React, { FormEvent } from 'react'

import './Input.css'

type InputProps = {
  label: string;
  value: string | number;
  type: string;
  placeholder: string;
  onChange: (event: FormEvent<HTMLInputElement>) => void
}

const Input = ({ label, value, type, placeholder, onChange }: InputProps) => {
  const id = `${label}-${type}-${placeholder}`.toLowerCase()

  return (
    <div className="input">
      <label className="input__label" htmlFor={id}>{label}</label>
      <input
        className="input__input"
        id={id}
        type={type}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
