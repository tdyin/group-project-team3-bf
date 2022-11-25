import { Box } from '@mui/material'
import { DrawerHeader } from '../../components/nav/Navbar'

export default function Employees() {
  return (
    <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      HR Employees Page
    </Box>
  )
}
