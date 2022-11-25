import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import Navbar from '../components/nav/Navbar'
import MyInfo from './employee/MyInfo'
import MyVisa from './employee/MyVisa'
import MyHousing from './employee/MyHousing'
import Housing from './hr/Housing'
import Hiring from './hr/Hiring'
import Visa from './hr/Visa'
import Employees from './hr/Employees'

export default function Home() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Routes>
        <Route path='/emp' element={<Navbar />}>
          <Route path='info' element={<MyInfo />} />
          <Route path='visa' element={<MyVisa />} />
          <Route path='housing' element={<MyHousing />} />
        </Route>
        <Route path='/hr' element={<Navbar />}>
          <Route path='employees' element={<Employees />} />
          <Route path='visa' element={<Visa />} />
          <Route path='hiring' element={<Hiring />} />
          <Route path='housing' element={<Housing />} />
        </Route>
      </Routes>
    </Box>
  )
}
