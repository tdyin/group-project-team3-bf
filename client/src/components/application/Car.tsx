import {
  Button,
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
  const [ifCar, setifCar] = useState('no')

  return (
    <Stack component='form' spacing={3}>
      <Typography variant='h6' gutterBottom>
        Optional
      </Typography>
      <FormControl>
        <Typography variant='body1' gutterBottom>
          Do you have a driver's license?
        </Typography>
        <RadioGroup
          value={ifLicense}
          onChange={(e) => setifLicense(e.target.value)}
        >
          <FormControlLabel value='yes' control={<Radio />} label='Yes' />
          <FormControlLabel value='no' control={<Radio />} label='No' />
        </RadioGroup>
      </FormControl>
      {ifLicense === 'yes' && (
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
          <label htmlFor='btn-upload'>
            <input
              id='btn-upload'
              name='btn-upload'
              style={{ display: 'none' }}
              type='file'
            />
            <Button className='btn-choose' variant='outlined' component='span'>
              Upload driver's license
            </Button>
          </label>
        </>
      )}
      <FormControl>
        <Typography variant='body1' gutterBottom>
          Do you have a car?
        </Typography>
        <RadioGroup value={ifCar} onChange={(e) => setifCar(e.target.value)}>
          <FormControlLabel value='yes' control={<Radio />} label='Yes' />
          <FormControlLabel value='no' control={<Radio />} label='No' />
        </RadioGroup>
      </FormControl>
      {ifCar === 'yes' && (
        <>
          <TextField label='Make' type='text' name='make' />
          <TextField label='Model' type='text' name='model' />
          <TextField label='Color' type='text' name='color' />
        </>
      )}
    </Stack>
  )
}
