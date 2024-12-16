import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import DescriptionIcon from '@mui/icons-material/Description'

export const Navigation: React.FC = () => {
  const location = useLocation()

  const navigation = [
    { name: 'Requirements', href: '/', icon: AssignmentIcon },
    { name: 'Documents', href: '/documents', icon: DescriptionIcon },
  ]

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          CSR Manager
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          {navigation.map(({ name, href, icon: Icon }) => (
            <Button
              key={name}
              component={RouterLink}
              to={href}
              startIcon={<Icon />}
              color={location.pathname === href ? 'primary' : 'inherit'}
              sx={{ mr: 2 }}
            >
              {name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
