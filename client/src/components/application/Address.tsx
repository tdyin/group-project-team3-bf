import { Stack, TextField } from '@mui/material/'

export default function Address() {
  return (
    <Stack component='form' spacing={3}>
      <TextField label='Street' type='text' name='street' />
      <TextField label='Bldg/Apt' type='text' name='bldgApt' />
      <TextField label='City' type='text' name='city' />
      <TextField label='State' type='text' name='state' />
      <TextField label='Zip Code' type='text' name='zip' />
    </Stack>
  )
}
