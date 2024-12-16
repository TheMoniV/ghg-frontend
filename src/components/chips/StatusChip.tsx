import React from 'react'
import { Chip } from '@mui/material'
import { RequirementStatus } from '../../types/Requirement.type'
import { DocumentFileStatus } from '../../types/Document.type.ts'

const statusConfig = {
  // Requirement status colors
  COMPLIANT: { color: 'success' as const, label: 'Compliant' },
  NON_COMPLIANT: { color: 'error' as const, label: 'Non Compliant' },
  IN_PROGRESS: { color: 'info' as const, label: 'In Progress' },
  // Document status colors
  DRAFT: { color: 'default' as const, label: 'Draft' },
  NEW: { color: 'default' as const, label: 'New' },
  //'pending-validation': { color: 'info' as const, label: 'Pending Validation' },
  VALIDATED: { color: 'success' as const, label: 'Validated' },
  SENT_TO_AUTHORITIES: {
    color: 'info' as const,
    label: 'Sent To Authorities',
  },
  MISSING_DOCUMENTS: { color: 'warning' as const, label: 'Missing Documents' },
  EXAMINED: { color: 'info' as const, label: 'Examined' },
  IN_REVIEW: { color: 'info' as const, label: 'In Review' },
}

interface StatusChipProps {
  status: RequirementStatus | DocumentFileStatus
}

export const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const config = statusConfig[status]
  return <Chip size="small" color={config.color} label={config.label} />
}
