import React from 'react'
import {
  Stack,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Divider,
  Paper,
} from '@mui/material'
import { Trash2 } from 'lucide-react'
import { DocumentFile, DocumentFileStatus } from '../../types/Document.type.ts'
import { StatusChip } from '../chips/StatusChip.tsx'
import { RequirementStatus } from '../../types/Requirement.type.ts'

interface DocumentFileProps {
  file: DocumentFile
  documentFileId: string
  onStatusUpdate: (id: string, status: DocumentFileStatus) => void
  onDelete: (id: string) => void
}

export const DocumentFileComponent: React.FC<DocumentFileProps> = ({
  file,
  documentFileId,
  onStatusUpdate,
  onDelete,
}) => {
  return (
    <Paper variant="outlined" sx={{ p: 2, my: 1 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack flex={1} spacing={1}>
          <Typography variant="body2" color="text.primary" fontWeight="medium">
            {file.name}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Typography variant="caption" color="text.secondary">
              Version: {file.version}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Created: {file.createdAt}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Expires: {file.expirationDate ?? 'Never'}
            </Typography>
          </Stack>
        </Stack>

        <StatusChip
          status={file.status as DocumentFileStatus | RequirementStatus}
        />

        <Select
          size="small"
          value={file.status}
          onChange={(e) =>
            onStatusUpdate(documentFileId, e.target.value as DocumentFileStatus)
          }
          sx={{ minWidth: 150 }}
        >
          {Object.values(DocumentFileStatus).map((status) => (
            <MenuItem key={status} value={status}>
              {status.replace(/_/g, ' ')}
            </MenuItem>
          ))}
        </Select>

        <IconButton
          edge="end"
          color="error"
          onClick={() => onDelete(documentFileId)}
          sx={{ ml: 'auto' }}
        >
          <Trash2 />
        </IconButton>
      </Stack>
    </Paper>
  )
}
