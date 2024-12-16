import React from 'react'
import { Stack, Typography } from '@mui/material'
import { RequiredDocsChip } from '../chips/RequiredDocsChip'
import { Document } from '../../types/Requirement.type'

interface RequirementDocumentsProps {
  documents: Document[]
}

export const RequirementDocuments: React.FC<RequirementDocumentsProps> = ({
  documents,
}) => {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2" color="text.primary">
        Required Documents For Compliance
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        flexWrap="wrap"
        sx={{ gap: 1 }}
      >
        {documents.map((doc) => (
          <RequiredDocsChip key={doc.id} requiredDocument={doc.name} />
        ))}
      </Stack>
    </Stack>
  )
}
