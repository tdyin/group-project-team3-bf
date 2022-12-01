import { Stack, TextField, MenuItem, Button, Typography } from '@mui/material/'

export default function UserInfo() {
  return (
    <Stack component='form' spacing={3}>
      <TextField label='First Name' type='text' name='fisrtName' />
      <TextField label='Last Name' type='text' name='lastName' />
      <TextField label='Middle Name' type='text' name='middleName' />
      <TextField label='Preferred Name' type='text' name='preferredName' />
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
      <TextField label='SSN' type='text' name='SSN' />
      <label htmlFor='btn-upload'>
        <span>Optional: </span>
        <input
          id='btn-upload'
          name='btn-upload'
          style={{ display: 'none' }}
          type='file'
        />
        <Button className='btn-choose' variant='outlined' component='span'>
          Upload Profile Picture
        </Button>
      </label>
    </Stack>
  )
}
