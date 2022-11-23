import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Home() {
  const navigate = useNavigate()

  const toTest = () => {
    navigate('/test')
  }

  const toLogin = () => {
    navigate('/login')
  }

  return (
    <div>
      <h2>Home</h2>
      <Button variant='contained' onClick={toTest}>
        Test
      </Button>
      <Button variant='contained' onClick={toLogin}>
        Login
      </Button>
    </div>
  )
}
