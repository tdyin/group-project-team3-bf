import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Application from './pages/Application'
import store from './redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/application' element={<Application />} />
            <Route path='/' element={<Navigate to='/emp/info' />} />
            <Route path='/*' element={<Home />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
