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
import api from './api';

const initialValues = {
  username: '',
  password: '',
}

export default function LoginForm() {
  const [values, setValues] = useState(initialValues);
  const [cookie, setCookie] = useState({});
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
    api.logIn(values, updateCookies)
      .then((res) => {
        console.log(res)
        navigate('/');
      })
      .catch((err) => {
        console.log(err)
      })
  };

  function updateCookies() {
    const newCookies = {};
    // if (cookie) {
    //   //if session already exists in state, no need to get username; just copy them over
    //   newCookies.username = cookie.username;
    // } else {
    //   api
    //     .getCookieData()
    //     .then((res) => {
    //       newCookies.username = res.username;
    //       return api.getUserInfo(res.username);
    //     })
    //     .catch((err) => console.log(err));
    // }
    // setCookie(newCookies);
    return newCookies;
  }

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
              autoComplete="username"
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
  );
}