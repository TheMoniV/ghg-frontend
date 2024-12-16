import React from 'react'
import { Select, MenuItem } from '@mui/material'
import { RequirementStatus } from '../../types/Requirement.type'

interface RequirementStatusSelectProps {
  status: RequirementStatus
  onStatusChange: (status: RequirementStatus) => void
  isLoading?: boolean
}

export const RequirementStatusSelect: React.FC<
  RequirementStatusSelectProps
> = ({ status, onStatusChange, isLoading }) => {
  return (
    <Select
      size="small"
      value={status}
      onChange={(e) => onStatusChange(e.target.value as RequirementStatus)}
      disabled={isLoading}
      sx={{ minWidth: 150 }}
    >
      {Object.values(RequirementStatus).map((status) => (
        <MenuItem key={status} value={status}>
          {status.replace(/_/g, ' ')}
        </MenuItem>
      ))}
    </Select>
  )
}
