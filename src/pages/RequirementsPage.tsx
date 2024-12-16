import React from 'react'
import { Paper, Typography, Box } from '@mui/material'
import { useQuery } from 'react-query'
import { RequirementList } from '../components/requirements/RequirementList.tsx'
import axios from 'axios'

export const RequirementsPage: React.FC = () => {
  const { isLoading, error, data } = useQuery('requirements', () =>
    axios.get('http://localhost:3000/requirements').then((res) => res.data),
  )

  let list

  if (isLoading) {
    list = (
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
    if (error) {
      list = (
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
      list = <RequirementList requirements={data}></RequirementList>
    }
  }

  return (
    <Paper>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          CSR Requirements
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Track and monitor your company's compliance with CSR requirements
        </Typography>
        {list}
      </Box>
    </Paper>
  )
}
