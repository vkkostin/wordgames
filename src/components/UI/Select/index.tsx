import React, { FormEvent } from 'react'

import './Select.css'

type Option = {
  value: string | number;
  label: string;
}

type SelectProps = {
  label: string;
  options: Option[];
  value: string | number;
  onChange: (event: FormEvent<HTMLSelectElement>) => void
}

const Select = ({ label, options, value, onChange }: SelectProps) => {
  const id = `${label}-${options.map(({ label }) => label).join('-')}`.toLowerCase()

  return (
    <div className="select">
      <label className="select__label" htmlFor={id}>{label}</label>
      <select className="select__input" id={id} value={value} onChange={onChange}>
        {options.map(({ value, label }, index) => <option key={index} value={value}>{label}</option>)}
      </select>
    </div>
  )
}

export default Select
