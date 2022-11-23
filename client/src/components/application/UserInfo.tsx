import { Stack, TextField, MenuItem } from '@mui/material/'

export default function UserInfo() {
  return (
    <Stack
      component='form'
      spacing={3}
      sx={{
        padding: '1rem',
        width: '350px',
      }}
    >
      <TextField label='First Name' type='text' name='fisrtName' />
      <TextField label='Last Name' type='text' name='lastName' />
      <TextField label='Middle Name' type='text' name='middleName' />
      <TextField label='Preferred Name' type='text' name='preferredName' />
      <TextField label='SSN' type='text' name='SSN' />
      <TextField
        label='Date of Birth'
        type='date'
        name='DOB'
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField label='Gender' select>
        <MenuItem>Male</MenuItem>
        <MenuItem>Female</MenuItem>
        <MenuItem>I do not wish to answer.</MenuItem>
      </TextField>
    </Stack>
  )
}
