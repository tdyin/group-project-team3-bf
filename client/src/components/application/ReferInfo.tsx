import { Stack, TextField, Typography } from '@mui/material/'

export default function ReferInfo() {
  return (
    <Stack component='form' spacing={3}>
      <Typography variant='h6' gutterBottom>
        Optional
      </Typography>
      <TextField label='First Name' type='text' name='firstName' />
      <TextField label='Last Name' type='text' name='lastName' />
      <TextField label='Middle Name' type='text' name='middleName' />
      <TextField label='Phone' type='text' name='phone' />
      <TextField label='Email' type='text' name='email' />
      <TextField label='Relationship' type='text' name='relationship' />
    </Stack>
  )
}
