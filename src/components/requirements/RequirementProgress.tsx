import React from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'
import { Requirement } from '../../types/Requirement.type'
import { DocumentFileStatus } from '../../types/Document.type.ts'

interface RequirementProgressProps {
  requirement: Requirement
}

export const RequirementProgress: React.FC<RequirementProgressProps> = ({
  requirement,
}) => {
  const getProgress = () => {
    const total =
      requirement.documentsProvided.length ||
      requirement.requiredDocuments.length
    const validDocs = requirement.documentsProvided.filter(
      (pd) => pd.status === DocumentFileStatus.VALIDATED,
    ).length
    return Math.round((validDocs / total) * 100)
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" color="text.primary" gutterBottom>
        Progress to compliance
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <LinearProgress
          variant="determinate"
          value={getProgress()}
          sx={{ flexGrow: 1 }}
        />
        <Typography variant="body2" color="text.secondary">
          {getProgress()}%
        </Typography>
      </Box>
    </Box>
  )
}
