import { useEffect, useState } from 'react';
import { Box } from '@mui/material'
import { DrawerHeader } from '../../components/nav/Navbar'
import RegisterToken from '../../components/hrmanagement/RegisterToken';

export default function Hiring() {
  //Map and add RegisterToken and Onboarding components, pass user info
  return (
    <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      HR Hiring Page

      <RegisterToken/>
    </Box>
  )
}
