import React from 'react'
import { List } from '@mui/material'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { Requirement, RequirementStatus } from '../../types/Requirement.type'
import { RequirementItem } from './RequirementItem'

interface RequirementListProps {
  requirements: Requirement[]
}

export const RequirementList: React.FC<RequirementListProps> = ({
  requirements,
}) => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: {
      requirementId: string
      status: RequirementStatus
    }) => {
      return axios.patch('http://localhost:3000/requirements', data)
    },
    onSuccess: () => {
      return queryClient.refetchQueries()
    },
  })

  const handleStatusUpdate = (
    requirementId: string,
    status: RequirementStatus,
  ) => {
    mutate({ requirementId, status })
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {requirements.map((requirement) => (
        <RequirementItem
          key={requirement.id}
          requirement={requirement}
          onStatusUpdate={handleStatusUpdate}
          isUpdating={isLoading}
        />
      ))}
    </List>
  )
}
