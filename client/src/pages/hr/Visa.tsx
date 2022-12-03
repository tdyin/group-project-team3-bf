import { Box } from '@mui/material'
import { DrawerHeader } from '../../components/nav/Navbar'
import VisaStatusHr from '../../components/visaStatus/VisaStatusHr'

export default function Visa() {
  return (
    <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      HR Visa Page
      <VisaStatusHr />
    </Box>
  )
}
