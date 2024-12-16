import React from 'react'
import { DocumentStatus, RequirementStatus } from '../types'

const statusColors = {
  // Requirement status colors
  compliant: 'bg-green-100 text-green-800',
  'non-compliant': 'bg-red-100 text-red-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  // Document status colors
  draft: 'bg-gray-100 text-gray-800',
  'pending-validation': 'bg-blue-100 text-blue-800',
  validated: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

interface StatusBadgeProps {
  status: RequirementStatus | DocumentStatus
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}
    >
      {status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
    </span>
  )
}
