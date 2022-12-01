import { Stack, TextField } from '@mui/material/'

export default function EmeContact() {
  return (
    <Stack component='form' spacing={3}>
      <TextField label='First Name' type='text' name='firstName' />
      <TextField label='Last Name' type='text' name='lastName' />
      <TextField label='Middle Name' type='text' name='middleName' />
      <TextField label='Phone' type='text' name='phone' />
      <TextField label='Email' type='text' name='email' />
      <TextField label='Relationship' type='text' name='relationship' />
    </Stack>
  )
}
