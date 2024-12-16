import React from 'react'
import { FormSelect } from './FormSelect.tsx'

interface Requirement {
  id: string
  name: string
}

interface RequirementSelectProps {
  requirements: Requirement[]
  value: string
  onChange: (value: string) => void
}

export const RequirementSelect: React.FC<RequirementSelectProps> = ({
  requirements,
  value,
  onChange,
}) => {
  const options = requirements.map((req) => ({
    value: req.id,
    label: req.name,
  }))

  return (
    <FormSelect
      name="requirementId"
      label="Requirement"
      options={options}
      value={value}
      onChange={onChange}
    />
  )
}
