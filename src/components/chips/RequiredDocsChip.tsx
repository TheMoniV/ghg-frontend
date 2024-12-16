import React from 'react'
import { Chip } from '@mui/material'

interface StatusChipProps {
  requiredDocument: string
}

export const RequiredDocsChip: React.FC<StatusChipProps> = ({
  requiredDocument,
}) => {
  return <Chip size="small" color="success" label={requiredDocument} />
}
