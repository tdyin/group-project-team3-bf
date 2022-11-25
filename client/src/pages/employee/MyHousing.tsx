import { Box } from '@mui/material'
import { DrawerHeader } from '../../components/nav/Navbar'

export default function MyHousing() {
  return (
    <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      Personal Housing Page
    </Box>
  )
}
