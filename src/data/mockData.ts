import { Document, Requirement } from '../types'

export const requirements: Requirement[] = [
  {
    id: '1',
    title: 'GHG Emissions Reduction',
    description:
      'Formalized GHG emissions reduction targets and trajectory: The organization has established goals and planned a pathway for reducing GHG emissions over time',
    status: 'in-progress',
  },
  {
    id: '2',
    title: 'Environmental Management System',
    description:
      'Implementation of a certified environmental management system',
    status: 'compliant',
  },
  {
    id: '3',
    title: 'Supply Chain Assessment',
    description:
      'Regular assessment and monitoring of supply chain sustainability practices',
    status: 'non-compliant',
  },
]

export const documents: Document[] = [
  {
    id: '1',
    title: 'GHG Emissions Policy 2024',
    requirementId: '1',
    version: '2024.1',
    status: 'pending-validation',
    createdAt: '2024-03-01',
    expiresAt: '2025-03-01',
  },
  {
    id: '2',
    title: 'ISO 14001 Certificate',
    requirementId: '2',
    version: '2024.1',
    status: 'validated',
    createdAt: '2024-01-15',
    expiresAt: '2025-01-15',
  },
]
