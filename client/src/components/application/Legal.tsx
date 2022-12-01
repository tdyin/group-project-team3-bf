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

export default function Legal() {
  const [ifPermanent, setifPermanent] = useState('no')
  const [permanent, setPermanent] = useState('')
  const [visa, setVisa] = useState('')

  return (
    <Stack component='form' spacing={3}>
      <FormControl>
        <Typography variant='body1' gutterBottom>
          Are you a citizen or permanent resident of the U.S?
        </Typography>
        <RadioGroup
          value={ifPermanent}
          onChange={(e) => setifPermanent(e.target.value)}
        >
          <FormControlLabel value='yes' control={<Radio />} label='Yes' />
          <FormControlLabel value='no' control={<Radio />} label='No' />
        </RadioGroup>
      </FormControl>
      {ifPermanent === 'yes' ? (
        <>
          <FormControl>
            <RadioGroup
              value={permanent}
              onChange={(e) => setPermanent(e.target.value)}
            >
              <Typography variant='body1' gutterBottom>
                You are:
              </Typography>
              <FormControlLabel
                value='Green Card'
                control={<Radio />}
                label='Green Card Holder'
              />
              <FormControlLabel
                value='Citizen'
                control={<Radio />}
                label='Citizen'
              />
            </RadioGroup>
          </FormControl>
        </>
      ) : (
        <>
          <FormControl>
            <Typography variant='body1' gutterBottom>
              What is your work authorization?
            </Typography>
            <RadioGroup value={visa} onChange={(e) => setVisa(e.target.value)}>
              <FormControlLabel value='H1-B' control={<Radio />} label='H1-B' />
              <FormControlLabel value='L2' control={<Radio />} label='L2' />
              <FormControlLabel
                value='F1(CPT/OPT)'
                control={<Radio />}
                label='F1(CPT/OPT)'
              />
              <FormControlLabel value='H4' control={<Radio />} label='H4' />
              <FormControlLabel
                value='Other'
                control={<Radio />}
                label='Other'
              />
            </RadioGroup>
          </FormControl>
          {visa === 'Other' ? (
            <TextField
              label='Work Authorization'
              type='text'
              name='visaTitle'
            />
          ) : (
            <></>
          )}
          <TextField
            label='Start Date'
            type='date'
            name='startDate'
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label='End Date'
            type='date'
            name='endDate'
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
              Upload work authorization
            </Button>
          </label>
        </>
      )}
    </Stack>
  )
}
