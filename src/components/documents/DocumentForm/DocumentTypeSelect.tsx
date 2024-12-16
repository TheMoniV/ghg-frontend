import React from 'react'
import { FormSelect } from './FormSelect.tsx'

export interface DocumentType {
  documentId: string
  documentType: string
}

interface DocumentTypeSelectProps {
  documentTypes: DocumentType[]
  value: string
  onChange: (value: string) => void
}

export const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({
  documentTypes,
  value,
  onChange,
}) => {
  const options = documentTypes.map((dt) => ({
    value: dt.documentId,
    label: dt.documentType.replace(/-/g, ' '),
  }))

  return (
    <FormSelect
      name="documentId"
      label="Document Type"
      options={options}
      value={value}
      onChange={onChange}
    />
  )
}
