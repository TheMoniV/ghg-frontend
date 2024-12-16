import React from 'react'
import { DocumentFileStatus } from '../../../types/Document.type'
import { FormSelect } from './FormSelect.tsx'

interface StatusSelectProps {
  value: DocumentFileStatus
  onChange: (value: DocumentFileStatus) => void
}

export const StatusSelect: React.FC<StatusSelectProps> = ({
  value,
  onChange,
}) => {
  const options = Object.values(DocumentFileStatus).map((status) => ({
    value: status,
    label: status.replace(/_/g, ' '),
  }))

  return (
    <FormSelect
      name="status"
      label="Status"
      options={options}
      value={value}
      onChange={(value) => onChange(value as DocumentFileStatus)}
    />
  )
}
