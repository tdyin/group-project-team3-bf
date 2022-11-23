import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Test from './pages/Test'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/test' element={<Test />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
