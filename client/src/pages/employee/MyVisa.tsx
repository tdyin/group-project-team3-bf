import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import Navbar, { DrawerHeader } from '../../components/nav/Navbar'

export default function MyVisa() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        Personal Visa Page
      </Box>
    </Box>
  )
}
