import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material/'
import { useState } from 'react'

export default function Car() {
  const [ifLicense, setifLicense] = useState('no')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setifLicense((event.target as HTMLInputElement).value)
  }

  return (
    <Stack
      component='form'
      spacing={3}
      sx={{
        padding: '1rem',
        width: '350px',
      }}
    >
      <FormControl>
        <Typography variant='body1' gutterBottom>
          Do you have a driver's license?
        </Typography>
        <RadioGroup value={ifLicense} onChange={handleChange}>
          <FormControlLabel value='yes' control={<Radio />} label='Yes' />
          <FormControlLabel value='no' control={<Radio />} label='No' />
        </RadioGroup>
      </FormControl>
      {ifLicense === 'yes' ? (
        <>
          <TextField label='License Number' type='text' name='licenseNum' />
          <TextField
            label='Expiration Date'
            type='date'
            name='expDate'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </>
      ) : null}

      <TextField label='Make' type='text' name='make' />
      <TextField label='Model' type='text' name='model' />
      <TextField label='Color' type='text' name='color' />
    </Stack>
  )
}
