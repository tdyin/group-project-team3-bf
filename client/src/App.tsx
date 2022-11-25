import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Application from './pages/Application'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/application' element={<Application />} />
          <Route path='/' element={<Navigate to='/emp/info' />} />
          <Route path='/*' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
