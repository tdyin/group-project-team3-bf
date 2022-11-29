import { Box } from '@mui/material'
import { DrawerHeader } from '../../components/nav/Navbar'
import VisaStatusEmp from '../../components/visaStatus/VisaStatusEmp'

export default function MyVisa() {
  return (
    <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      Personal visa status
      <VisaStatusEmp />
    </Box>
  )
}

