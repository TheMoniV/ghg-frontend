import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Box,
} from '@mui/material'
import { Document, DocumentFileStatus } from '../../types/Document.type'
import { DocumentFileComponent } from './DocumentFile'

interface DocumentListProps {
  documents: Document[]
  onStatusUpdate: (id: string, status: DocumentFileStatus) => void
  onDelete: (id: string) => void
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onStatusUpdate,
  onDelete,
}) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {documents.map((document) => (
        <ListItem
          key={document.id}
          component={Paper}
          variant="outlined"
          sx={{ mb: 2, flexDirection: 'column', alignItems: 'stretch', p: 3 }}
        >
          <ListItemText
            primary={
              <Typography variant="h6" color="primary" gutterBottom>
                {document.name}
              </Typography>
            }
            secondary={
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {document.description}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.primary"
                  sx={{ mb: 2, mt: 3 }}
                >
                  Files
                </Typography>
                {document.files.map((file) => (
                  <DocumentFileComponent
                    key={file.id}
                    file={file}
                    documentFileId={file.id}
                    onStatusUpdate={onStatusUpdate}
                    onDelete={onDelete}
                  />
                ))}
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  )
}
