import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';


const initialValues = {
  username: '',
  password: '',
}

type User = {
  username: string,
  password: string
}

export default function LoginForm() {
  const { formState: {errors} } = useForm<User>();
  const [values, setValues] = useState(initialValues);
  const navigate = useNavigate();

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(values)
    axios.post('http://localhost:8080/login', values)
      .then((res: any) => {
        console.log(res)
        navigate('/');
      })
      .catch((err: any) => {
        console.log(err)
      })
  };



  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="off"
              onChange={handleInputChange}
              inputProps={{pattern: {value: /^[a-zA-z0-9-_]$/, message: "Username must only contains letters and numbers"}}}
            />
            <ErrorMessage errors={errors} name="username" as="p"/>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              onChange={handleInputChange}
              inputProps={{pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*)(+=._-]).$/,
                message: "Password must contain at least one Lowercase, Uppercase, Number, and Special Character"
            }}}
            />
            <ErrorMessage errors={errors} name="password" render={({ message }) => <p>{message}</p>} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Link onClick={() => navigate('/')} style={{cursor:"pointer"}} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Container>
  );
}