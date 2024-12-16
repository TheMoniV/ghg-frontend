import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  CircularProgress,
} from '@mui/material'
import {
  CreateDocumentFile,
  DocumentFileStatus,
  DocumentWithRequirements,
} from '../../types/Document.type.ts'
import { DocumentTypeSelect } from './DocumentForm/DocumentTypeSelect.tsx'
import { RequirementSelect } from './DocumentForm/RequirementSelect.tsx'
import { StatusSelect } from './DocumentForm/StatusSelect.tsx'

interface DocumentFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (document: Partial<CreateDocumentFile>) => void
}

export const DocumentForm: React.FC<DocumentFormProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const { data: docWithReq, isLoading } = useQuery('doc-requirements', () =>
    axios
      .get<
        DocumentWithRequirements[]
      >('http://localhost:3000/documents/with-requirement')
      .then((res) => res.data),
  )

  const [selectedStatusValue, setSelectedStatusValue] = React.useState(
    DocumentFileStatus.NEW,
  )
  const documentTypes = React.useMemo(
    () =>
      docWithReq?.map((d) => ({
        documentId: d.id,
        documentType: d.documentType,
      })) ?? [],
    [docWithReq],
  )

  const [selectedDocumentType, setSelectedDocumentType] = React.useState('')
  React.useEffect(() => {
    if (documentTypes.length > 0 && !selectedDocumentType) {
      setSelectedDocumentType(documentTypes[0].documentId)
    }
  }, [documentTypes, selectedDocumentType])

  const requirementList = React.useMemo(
    () =>
      docWithReq?.find((dwr) => dwr.id === selectedDocumentType)
        ?.requirements ?? [],
    [docWithReq, selectedDocumentType],
  )

  const [selectedRequirementId, setSelectedRequirementId] = React.useState('')
  React.useEffect(() => {
    if (requirementList.length > 0) {
      setSelectedRequirementId(requirementList[0].id)
    }
  }, [requirementList])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onSubmit({
      name: formData.get('name') as string,
      version: formData.get('version') as string,
      requirementId: formData.get('requirementId') as string,
      documentId: formData.get('documentId') as string,
      status: formData.get('status') as DocumentFileStatus,
      expirationDate: (formData.get('expirationDate') as string) || undefined,
    })
  }

  if (isLoading) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Stack alignItems="center" justifyContent="center" py={4}>
            <CircularProgress />
          </Stack>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>New Document File</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              name="name"
              label="Document Name"
              required
              fullWidth
              autoFocus
            />
            <TextField name="version" label="Version" required fullWidth />
            <DocumentTypeSelect
              documentTypes={documentTypes}
              value={selectedDocumentType}
              onChange={setSelectedDocumentType}
            />
            <RequirementSelect
              requirements={requirementList}
              value={selectedRequirementId}
              onChange={setSelectedRequirementId}
            />
            <StatusSelect
              value={selectedStatusValue}
              onChange={setSelectedStatusValue}
            />
            <TextField
              name="expirationDate"
              label="Expiration Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
