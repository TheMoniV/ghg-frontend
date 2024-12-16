import React from 'react'
import { ListItem, ListItemText, Stack, Typography, Paper } from '@mui/material'
import { Requirement, RequirementStatus } from '../../types/Requirement.type'
import { RequirementDocuments } from './RequirementDocuments'
import { RequirementProgress } from './RequirementProgress'
import { RequirementStatusSelect } from './RequirementSelectStatus'

interface RequirementItemProps {
  requirement: Requirement
  onStatusUpdate: (requirementId: string, status: RequirementStatus) => void
  isUpdating?: boolean
}

export const RequirementItem: React.FC<RequirementItemProps> = ({
  requirement,
  onStatusUpdate,
  isUpdating,
}) => {
  return (
    <ListItem
      component={Paper}
      variant="outlined"
      sx={{ mb: 2, flexDirection: 'column', alignItems: 'stretch', p: 3 }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Typography variant="h6" color="primary">
          {requirement.name}
        </Typography>
        <RequirementStatusSelect
          status={requirement.status}
          onStatusChange={(status) => onStatusUpdate(requirement.id, status)}
          isLoading={isUpdating}
        />
      </Stack>

      <ListItemText
        secondary={
          <Stack spacing={3}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: 'pre-line' }}
            >
              {requirement.description.replace(/\\n/g, '\n')}
            </Typography>
            <RequirementDocuments documents={requirement.requiredDocuments} />
            <RequirementProgress requirement={requirement} />
          </Stack>
        }
      />
    </ListItem>
  )
}
