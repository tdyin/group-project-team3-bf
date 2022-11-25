import { Box, CssBaseline } from '@mui/material'
import Navbar, { DrawerHeader } from '../../components/nav/Navbar'

export default function MyInfo() {
  return (
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        Personal Information Page
      </Box>
  )
}
