import React, { useState } from 'react'
import { Paper, Typography, Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import axios from 'axios'
import { DocumentList } from '../components/documents/DocumentList'
import { DocumentForm } from '../components/documents/DocumentForm'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  CreateDocumentFile,
  Document,
  DocumentFileStatus,
  UpdateDocumentFileStatus,
} from '../types/Document.type.ts'

export const DocumentsPage: React.FC = () => {
  const queryClient = useQueryClient()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const {
    isLoading: isDocsLoading,
    error: errorLoadingDocs,
    data: documents,
  } = useQuery('documents', () =>
    axios
      .get<Document[]>('http://localhost:3000/documents')
      .then((res) => res.data),
  )

  const createDocumentFileMutation = useMutation({
    mutationFn: (data: Partial<CreateDocumentFile>) => {
      return axios.post('http://localhost:3000/documents', data)
    },
    onSuccess: (_data) => {
      return queryClient.refetchQueries()
    },
  })

  const updateDocumentFileStatusMutation = useMutation({
    mutationFn: (data: UpdateDocumentFileStatus) => {
      return axios.patch(`http://localhost:3000/documents/${data.id}`, {
        status: data.status,
      })
    },
    onSuccess: (_data) => {
      return queryClient.refetchQueries()
    },
  })

  const deleteDocumentFileMutation = useMutation({
    mutationFn: (documentFileId: string) => {
      return axios.delete(`http://localhost:3000/documents/${documentFileId}`)
    },
    onSuccess: (_data) => {
      return queryClient.refetchQueries()
    },
  })

  const handleStatusUpdate = (
    documentFileId: string,
    newStatus: DocumentFileStatus,
  ) => {
    updateDocumentFileStatusMutation.mutate({
      id: documentFileId,
      status: newStatus,
    })
  }

  const handleDeleteDocument = (documentFileId: string) => {
    deleteDocumentFileMutation.mutate(documentFileId)
  }

  const handleCreateDocument = (documentData: Partial<CreateDocumentFile>) => {
    createDocumentFileMutation.mutate(documentData)
    setIsFormOpen(false)
  }

  let docList

  if (isDocsLoading) {
    docList = (
      <Typography
        variant="body2"
        color="text.secondary"
        paragraph
        align={'center'}
      >
        Loading ...
      </Typography>
    )
  } else {
    if (errorLoadingDocs) {
      docList = (
        <Typography
          variant="body2"
          color="text.secondary"
          paragraph
          align={'center'}
        >
          Ops! Something went wrong while fetching the requirements :(
        </Typography>
      )
    } else {
      docList = (
        <DocumentList
          documents={documents || []}
          onStatusUpdate={handleStatusUpdate}
          onDelete={handleDeleteDocument}
        />
      )
    }
  }

  return (
    <Paper>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <div>
            <Typography variant="h5" gutterBottom>
              Policy Documents
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your company's policy documents and their validation status
            </Typography>
          </div>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsFormOpen(true)}
            disabled={isDocsLoading}
          >
            New Document
          </Button>
        </Box>

        {docList}

        <DocumentForm
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleCreateDocument}
        />
      </Box>
    </Paper>
  )
}
