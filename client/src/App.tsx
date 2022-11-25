import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Application from './pages/Application'
import MyInfo from './pages/employee/MyInfo'
import MyVisa from './pages/employee/MyVisa'
import MyHousing from './pages/employee/MyHousing'
import Housing from './pages/hr/Housing'
import Hiring from './pages/hr/Hiring'
import Visa from './pages/hr/Visa'
import Employees from './pages/hr/Employees'
import Navbar, { DrawerHeader } from './components/nav/Navbar'
import { CssBaseline, Box } from '@mui/material'

function App() {
  return (
    <>
      <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Home />} />
              <Route path='/application' element={<Application />} />
              <Route path="/emp" element={<Navbar />} >
                <Route path='info' element={<MyInfo />} />
                <Route path='visa' element={<MyVisa />} />
                <Route path='housing' element={<MyHousing />} />
              </Route>
                <Route path='/hr/employees' element={<Employees />} />
                <Route path='/hr/visa' element={<Visa />} />
                <Route path='/hr/hiring' element={<Hiring />} />
                <Route path='/hr/housing' element={<Housing />} />
            </Routes>
        </Box>
      </BrowserRouter>
    </>
  )
}

export default App
