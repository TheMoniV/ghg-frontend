export enum DocumentFileStatus {
  NEW = 'NEW',
  IN_REVIEW = 'IN_REVIEW',
  EXAMINED = 'EXAMINED',
  SENT_TO_AUTHORITIES = 'SENT_TO_AUTHORITIES',
  VALIDATED = 'VALIDATED',
}

export interface DocumentFile {
  id: string
  name: string
  version: string
  status: string
  createdAt: string
  expirationDate?: string
}

export interface UpdateDocumentFileStatus {
  id: string
  status: DocumentFileStatus
}

export interface CreateDocumentFile {
  name: string
  version: string
  status: string
  requirementId: string
  documentId: string
  createdAt: string
  expirationDate?: string
}

export interface Document {
  id: string
  name: string
  description: string
  documentType: string
  files: DocumentFile[]
}

export interface Requirement {
  id: string
  name: string
}

export interface DocumentWithRequirements {
  id: string
  name: string
  documentType: string
  requirements: Requirement[]
}
