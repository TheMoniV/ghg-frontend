export enum DocumentFileStatus {
  NEW = 'NEW',
  IN_REVIEW = 'IN_REVIEW',
  EXAMINED = 'EXAMINED',
  SENT_TO_AUTHORITIES = 'SENT_TO_AUTHORITIES',
  VALIDATED = 'VALIDATED',
}

export enum RequirementStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLIANT = 'COMPLIANT',
  MISSING_DOCUMENTS = 'MISSING_DOCUMENTS',
  NON_COMPLIANT = 'NON_COMPLIANT',
}

export interface Document {
  id: string
  name: string
  documentType: string
}

export interface DocumentProvided {
  name: string
  status: DocumentFileStatus
  version: string
  expirationDate: Date
  documentType: string
}

export interface Requirement {
  id: string
  name: string
  description: string
  status: RequirementStatus
  requiredDocuments: Document[]
  documentsProvided: DocumentProvided[]
}
